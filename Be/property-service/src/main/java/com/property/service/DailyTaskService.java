package com.property.service;


import com.event.dto.CreateNotificationEvent;
import com.property.entity.Contract;
import com.property.entity.Tenant;
import com.property.repository.TenantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DailyTaskService {

    ContractService contractService;
    TenantRepository tenantRepository;

    KafkaTemplate<String, Object> kafkaTemplate;

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");

//    @Scheduled(fixedRate = 600000)
    public void reportCurrentTime() {
        log.info("The time is now {}", dateFormat.format(new Date()));

        log.info("Checking for upcoming contracts");

        List<Contract> contracts = contractService.getUpcomingContracts();

        log.info("contracts: {}", contracts.toString());

        for (Contract contract : contracts) {
            log.info("Sending notification to landlord: " + contract.getLandlordId());
            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(contract.getLandlordId())
                    .message("Hợp đồng của phòng " + contract.getRoom().getName() + " sắp hết hạn!!!")
                    .title("Hợp đồng sắp hết hạn")
                    .build());

            List<Tenant> tenants = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(contract.getRoom().getRoomId());

            for (Tenant tenant : tenants) {
                log.info("Sending notification to tenant: " + tenant.getTenantId());
                kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                        .recipient(tenant.getTenantId())
                        .message("Hợp đồng của phòng " + contract.getRoom().getName() + " sắp hết hạn!!!")
                        .title("Hợp đồng sắp hết hạn")
                        .build());
            }
        }
    }
}
