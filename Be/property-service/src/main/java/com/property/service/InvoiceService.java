package com.property.service;

import com.event.dto.CreateNotificationEvent;
import com.property.dto.response.InvoiceResponse;
import com.property.dto.response.MonthlyUsageResponse;
import com.property.entity.*;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.repository.ContractRepository;
import com.property.repository.InvoiceRepositoty;
import com.property.repository.RoomRepository;
import com.property.repository.TenantRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@ToString
public class InvoiceService {

    InvoiceRepositoty invoiceRepositoty;
    RoomRepository roomRepository;
    TenantRepository tenantRepository;
    ContractRepository contractRepository;

    KafkaTemplate<String, Object> kafkaTemplate;


    public InvoiceResponse getInvoice(String roomId, int month, int year) {

        Room room = roomRepository.findById(roomId).orElseThrow(
                () -> new AppException(ErrorCode.ROOM_NOT_FOUND)
        );

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }

        Invoice invoice = invoiceRepositoty.findByMonthAndYearAndRoom(month, year, room).orElseThrow(
                () -> new AppException(ErrorCode.INVOICE_NOT_FOUND)
        );


        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getName().equals(room.getRoomType().getApartment().getUserId())) {
            List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(roomId);

            for (Tenant tenant : tenantList) {
                log.info("Tenant found: {}", tenant.toString());
            }

            if (tenantList.stream().noneMatch(
                    tenant -> tenant.getTenantId().equals(authentication.getName())
            )) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        Contract contract = contractRepository.findByRoomIdAndIsAvailable(room.getRoomId(), true).orElseThrow(
                () -> new AppException(ErrorCode.CONTRACT_NOT_FOUND)
        );

        Instant createdAt = contract.getCreatedAt();
        ZonedDateTime zonedDateTime = createdAt.atZone(ZoneId.systemDefault());
        int monthCreated = zonedDateTime.getMonthValue();
        int yearCreated = zonedDateTime.getYear();

        if (!authentication.getName().equals(contract.getLandlordId())) {
            if (year < yearCreated || (year == yearCreated && month < monthCreated)) {
                throw new AppException(ErrorCode.INVOICE_NOT_FOUND);
            }
        }


        return InvoiceResponse.builder()
                .cost(invoice.getMonthlyUsages().stream().map(MonthlyUsage::getCost).reduce(BigDecimal::add).orElseThrow())
                .discount(null)
                .discountType(null)
                .monthlyUsageResponses(
                        invoice.getMonthlyUsages().stream().map(
                                monthlyUsage -> MonthlyUsageResponse.builder()
                                        .cost(monthlyUsage.getCost())
                                        .name(monthlyUsage.getAdditionalCost().getName())
                                        .usage(monthlyUsage.getUsage())
                                        .price(monthlyUsage.getAdditionalCost().getCost())
                                        .costType(monthlyUsage.getAdditionalCost().getAdditionalCostType().getName())
                                        .unit(monthlyUsage.getAdditionalCost().getUnit())
                                        .build()
                        ).collect(Collectors.toSet()))
                .pendingInvoice(invoice.getPendingInvoice())
                .build();
    }

    public void completeInvoice(String roomId, int month, int year) {
        Room room = roomRepository.findById(roomId).orElseThrow(
                () -> new AppException(ErrorCode.ROOM_NOT_FOUND)
        );

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }

        Invoice invoice = invoiceRepositoty.findByMonthAndYearAndRoom(month, year, room).orElseThrow(
                () -> new AppException(ErrorCode.INVOICE_NOT_FOUND)
        );

        invoice.setPendingInvoice(false);
        invoiceRepositoty.save(invoice);

        List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(roomId);

        for (Tenant tenant : tenantList) {
            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(tenant.getTenantId())
                    .message("Chủ trọ đã tạo hóa đơn tháng " + month + "/" + year)
                    .build());
        }
    }

}
