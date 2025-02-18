package com.property.service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.event.dto.CreateNotificationEvent;
import com.property.dto.response.InvoiceResponse;
import com.property.dto.response.MonthlyUsageResponse;
import com.property.dto.response.TotalInvoiceResponse;
import com.property.entity.*;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.repository.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@ToString
public class InvoiceService {

    InvoiceRepository invoiceRepository;
    RoomRepository roomRepository;
    TenantRepository tenantRepository;
    ContractRepository contractRepository;
    ApartmentRepository apartmentRepository;
    RoomTypeRepository roomTypeRepository;

    KafkaTemplate<String, Object> kafkaTemplate;

    public InvoiceResponse getInvoice(String roomId, int month, int year) {

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }

        Invoice invoice = invoiceRepository
                .findByMonthAndYearAndRoom(month, year, room)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getName().equals(room.getRoomType().getApartment().getUserId())) {
            List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(roomId);

            for (Tenant tenant : tenantList) {
                log.info("Tenant found: {}", tenant.toString());
            }

            if (tenantList.stream().noneMatch(tenant -> tenant.getTenantId().equals(authentication.getName()))) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

//        Contract contract = contractRepository
//                .findByRoomIdAndIsAvailable(room.getRoomId(), true)
//                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));

//        Instant createdAt = contract.getCreatedAt();
//        ZonedDateTime zonedDateTime = createdAt.atZone(ZoneId.systemDefault());
//        int monthCreated = zonedDateTime.getMonthValue();
//        int yearCreated = zonedDateTime.getYear();
//
//        if (!authentication.getName().equals(contract.getLandlordId())) {
//            if (year < yearCreated || (year == yearCreated && month < monthCreated)) {
//                throw new AppException(ErrorCode.INVOICE_NOT_FOUND);
//            }
//        }

        return InvoiceResponse.builder()
                .cost(invoice.getMonthlyUsages().stream()
                        .map(MonthlyUsage::getCost)
                        .reduce(BigDecimal::add)
                        .orElseThrow())
                .discount(null)
                .discountType(null)
                .isPaid(invoice.getIsPaid())
                .monthlyUsageResponses(invoice.getMonthlyUsages().stream()
                        .map(monthlyUsage -> MonthlyUsageResponse.builder()
                                .cost(monthlyUsage.getCost())
                                .name(monthlyUsage.getAdditionalCost().getName())
                                .usage(monthlyUsage.getUsage())
                                .price(monthlyUsage.getCost())
                                .costType(monthlyUsage
                                        .getAdditionalCost()
                                        .getAdditionalCostType()
                                        .getName())
                                .unit(monthlyUsage.getAdditionalCost().getUnit())
                                .build())
                        .collect(Collectors.toSet()))
                .pendingInvoice(invoice.getPendingInvoice())
                .build();
    }

    public InvoiceResponse completeInvoice(String roomId, int month, int year) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }

        Invoice invoice = invoiceRepository
                .findByMonthAndYearAndRoom(month, year, room)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));

        Contract contract = contractRepository
                .findByRoomIdAndIsAvailable(room.getRoomId(), true)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));

        //
        // invoice.setTotalUsage(invoice.getMonthlyUsages().stream().map(MonthlyUsage::getCost).reduce(BigDecimal::add).orElseThrow());

        BigDecimal totalUsage = invoice.getMonthlyUsages().stream()
                .map(MonthlyUsage::getCost)
                .reduce(BigDecimal::add)
                .orElseThrow();
        totalUsage = totalUsage.add(contract.getPrice());

        invoice.setTotalUsage(totalUsage);
        invoice.setPendingInvoice(false);
        invoice.setIsPaid(false);
        invoiceRepository.save(invoice);

        List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(roomId);

        for (Tenant tenant : tenantList) {
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .recipient(tenant.getTenantId())
                            .message("Chủ trọ đã tạo hóa đơn tháng " + month + "/" + year)
                            .build());
        }

        invoice.getMonthlyUsages().stream().map(monthlyUsage -> {
            log.info("MonthlyUsage: {}", monthlyUsage.getPrice());
            log.info("MonthlyUsage: {}", monthlyUsage.getCost());
            return monthlyUsage;
        });

        return InvoiceResponse.builder()
                .cost(invoice.getMonthlyUsages().stream()
                        .map(MonthlyUsage::getCost)
                        .reduce(BigDecimal::add)
                        .orElseThrow())
                .discount(null)
                .discountType(null)
                .monthlyUsageResponses(invoice.getMonthlyUsages().stream()
                        .map(monthlyUsage -> MonthlyUsageResponse.builder()
                                .cost(monthlyUsage.getCost())
                                .name(monthlyUsage.getAdditionalCost().getName())
                                .usage(monthlyUsage.getUsage())
                                .price(monthlyUsage.getPrice())
                                .costType(monthlyUsage
                                        .getAdditionalCost()
                                        .getAdditionalCostType()
                                        .getName())
                                .unit(monthlyUsage.getAdditionalCost().getUnit())
                                .build())
                        .collect(Collectors.toSet()))
                .pendingInvoice(invoice.getPendingInvoice())
                .isPaid(invoice.getIsPaid())
                .month(invoice.getMonth())
                .year(invoice.getYear())
                .build();
    }

    public void updateInvoice(String roomId, int month, int year) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }

        Invoice invoice = invoiceRepository
                .findByMonthAndYearAndRoom(month, year, room)
                .orElseThrow(() -> new AppException(ErrorCode.INVOICE_NOT_FOUND));

        invoice.setIsPaid(true);
        invoiceRepository.save(invoice);
    }

    public TotalInvoiceResponse totalInvoiceResponse(
            Integer month, Integer year, String roomTypeId, String apartmentId) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (apartmentId != null) {
            Apartment apartment = apartmentRepository
                    .findById(apartmentId)
                    .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

            return TotalInvoiceResponse.builder()
                    .total(getTotalAmountByApartmentId(
                            apartmentId, Optional.ofNullable(month), Optional.ofNullable(year)))
                    .build();
        } else if (roomTypeId != null) {
            RoomType roomType = roomTypeRepository
                    .findById(roomTypeId)
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

            if (!roomType.getApartment().getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }

            return TotalInvoiceResponse.builder()
                    .total(getTotalAmountByRoomTypeId(
                            roomTypeId, Optional.ofNullable(month), Optional.ofNullable(year)))
                    .build();
        } else {
            //            if(month == null || year == null) {
            //                throw new AppException(ErrorCode.INVALID_REQUEST);
            //            }
            return TotalInvoiceResponse.builder()
                    .total(invoiceRepository
                            .findTotalByMonthYearAndUserId(userId, month, year)
                            .orElse(BigDecimal.ZERO))
                    .build();
        }
    }

    public List<InvoiceResponse> paidInvoiceResponse(String roomId) {
        List<Invoice> invoices = invoiceRepository.findClosestInvoicesByRoomId(roomId);
        log.info("roomId: {}", invoices.size());
        if (!invoices.isEmpty()) {
            Invoice invoice = invoices.get(0);
            return invoices.stream()
                    .map(i -> {
                        log.info("Invoice: {}", i);
                        return InvoiceResponse.builder()
                                .cost(i.getTotalUsage())
                                .discount(null)
                                .discountType(null)
                                .pendingInvoice(i.getPendingInvoice())
                                .isPaid(i.getIsPaid())
                                .pendingInvoice(i.getPendingInvoice())
                                .month(i.getMonth())
                                .year(i.getYear())
                                .build();
                    })
                    .collect(Collectors.toList());
        } else {
            return null;
        }
    }

    public void completeInvoices(String roomId){
        List<Invoice> invoices = invoiceRepository.findClosestInvoicesByRoomId(roomId);
        if (!invoices.isEmpty()) {
            Invoice invoice = invoices.get(0);
            invoice.setIsPaid(true);
            invoiceRepository.save(invoice);
        }
    }

    @PersistenceContext
    private EntityManager entityManager;

    public BigDecimal getTotalAmountByRoomTypeId(String roomTypeId, Optional<Integer> month, Optional<Integer> year) {
        StringBuilder queryBuilder = new StringBuilder(
                "SELECT CAST(SUM(i.totalUsage) AS BigDecimal) FROM Invoice i JOIN i.room r WHERE r.roomType.roomTypeId = :roomTypeId");

        if (month.isPresent()) {
            queryBuilder.append(" AND i.month = :month");
        }
        if (year.isPresent()) {
            queryBuilder.append(" AND i.year = :year");
        }

        log.info("queryBuilder: " + queryBuilder.toString());

        TypedQuery<BigDecimal> query = entityManager.createQuery(queryBuilder.toString(), BigDecimal.class);
        query.setParameter("roomTypeId", roomTypeId);
        month.ifPresent(m -> query.setParameter("month", m));
        year.ifPresent(y -> query.setParameter("year", y));

        return query.getSingleResult();
    }

    public BigDecimal getTotalAmountByApartmentId(String apartmentId, Optional<Integer> month, Optional<Integer> year) {
        StringBuilder queryBuilder = new StringBuilder(
                "SELECT CAST(SUM(i.totalUsage) AS BigDecimal) FROM Invoice i JOIN i.room r JOIN r.roomType rt WHERE rt.apartment.apartmentId = :apartmentId");

        if (month.isPresent()) {
            queryBuilder.append(" AND i.month = :month");
        }
        if (year.isPresent()) {
            queryBuilder.append(" AND i.year = :year");
        }

        TypedQuery<BigDecimal> query = entityManager.createQuery(queryBuilder.toString(), BigDecimal.class);
        query.setParameter("apartmentId", apartmentId);
        month.ifPresent(m -> query.setParameter("month", m));
        year.ifPresent(y -> query.setParameter("year", y));

        return query.getSingleResult();
    }
}
