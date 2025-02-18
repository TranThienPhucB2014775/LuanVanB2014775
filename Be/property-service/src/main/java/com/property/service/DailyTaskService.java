package com.property.service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import com.event.dto.CreateNotificationEvent;
import com.property.entity.Contract;
import com.property.entity.Tenant;
import com.property.repository.ContractRepository;
import com.property.repository.TenantRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class DailyTaskService {

    ContractService contractService;
    ContractRepository contractRepository;
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
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .recipient(contract.getLandlordId())
                            .message("Hợp đồng của phòng " + contract.getRoom().getName() + " sắp hết hạn!!!")
                            .title("Hợp đồng sắp hết hạn")
                            .build());

            List<Tenant> tenants = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(
                    contract.getRoom().getRoomId());

            for (Tenant tenant : tenants) {
                log.info("Sending notification to tenant: " + tenant.getTenantId());
                kafkaTemplate.send(
                        "create-notification",
                        CreateNotificationEvent.builder()
                                .recipient(tenant.getTenantId())
                                .message("Hợp đồng của phòng "
                                        + contract.getRoom().getName() + " sắp hết hạn!!!")
                                .title("Hợp đồng sắp hết hạn")
                                .build());
            }
        }
    }

    //    @Scheduled(fixedRate = 20000)
    public void checkContract() {

        List<Contract> contracts = contractRepository.findExpiredContracts(Instant.now());

        for (Contract contract : contracts) {

            //            contractService.disableContractFromSystem(contract.getContractId());

            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .recipient(contract.getLandlordId())
                            .message("Hợp đồng của phòng " + contract.getRoom().getName() + " đã hết hạn.")
                            .title("Hợp đồng đã hết hạn")
                            .build());
            List<Tenant> tenants = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(
                    contract.getRoom().getRoomId());

            for (Tenant tenant : tenants) {

                tenantRepository.save(tenant);

                //                kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                //                        .recipient(tenant.getTenantId())
                //                        .message("Hợp đồng của phòng " + contract.getRoom().getName() + " đã hết hạn,
                // hệ thống sẽ tự động chuyển trạng thái phòng sang trống và hợp đồng sẽ không còn hiệu lực!!!")
                //                        .title("Hợp đồng đã hết hạn")
                //                        .build());
                kafkaTemplate.send(
                        "create-notification",
                        CreateNotificationEvent.builder()
                                .recipient(tenant.getTenantId())
                                .message("Hợp đồng của phòng "
                                        + contract.getRoom().getName() + " đã hết hạn.")
                                .title("Hợp đồng đã hết hạn")
                                .build());
            }
        }
    }
}
