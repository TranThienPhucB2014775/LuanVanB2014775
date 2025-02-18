package com.property.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.property.constant.AdditionalCostTypes;
import com.property.dto.request.MonthlyUsageCreationRequest;
import com.property.dto.response.MonthlyUsageCreationResponse;
import com.property.entity.*;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.MonthlyUsageMapper;
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
public class MonthlyUsageService {

    MonthlyUsageRepository monthlyUsageRepository;
    AdditionalCostRepository additionalCostRepository;
    InvoiceRepository invoiceRepository;
    RoomRepository roomRepository;
    ContractRepository contractRepository;

    public MonthlyUsageCreationResponse saveMonthlyUsage(MonthlyUsageCreationRequest request) {
        AdditionalCost additionalCost = additionalCostRepository
                .findById(request.getAdditionalCostId())
                .orElseThrow(() -> new IllegalArgumentException("INVALID_ADDITIONAL_COST_ID"));

        Contract contract = contractRepository
                .findByRoomIdAndIsAvailable(request.getRoomId(), true)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_AVAILABLE_IN_CONTRACT));

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!userId.equals(additionalCost.getApartment().getUserId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Long checkFutureInvoiceExists =
                invoiceRepository.checkFutureInvoiceExists(request.getMonth(), request.getYear(), contract.getRoom());

        log.info("checkFutureInvoiceExists: {}", checkFutureInvoiceExists);

        if (checkFutureInvoiceExists > 0) {
            throw new AppException(ErrorCode.FUTURE_INVOICE_EXISTS);
        }

        Optional<MonthlyUsage> checkMonthlyUsageExits =
                monthlyUsageRepository.findByRoomIdAndYearAndMonthAndAdditionalCost(
                        request.getRoomId(), request.getYear(), request.getMonth(), additionalCost);

        if (checkMonthlyUsageExits.isPresent()) {
            throw new AppException(ErrorCode.MONTHLY_USAGE_ALREADY_EXISTS);
        }

        Room room = roomRepository
                .findById(request.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("INVALID_ROOM_ID"));

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }

        Optional<Invoice> invoiceOpt =
                invoiceRepository.findByMonthAndYearAndRoom(request.getMonth(), request.getYear(), room);

        BigDecimal cost;

        if (additionalCost
                .getAdditionalCostType()
                .getName()
                .equals(AdditionalCostTypes.ROOM_COST_PER_MONTH.toString())) {
            cost = additionalCost.getCost();
            request.setUsage(new BigDecimal(1));
        } else if (additionalCost
                .getAdditionalCostType()
                .getName()
                .equals(AdditionalCostTypes.UNIT_COST_PER_MONTH.toString())) {

            List<MonthlyUsage> monthlyUsages =
                    monthlyUsageRepository.findByRoomIdAndAdditionalCost(request.getRoomId(), additionalCost);

            int currentMonth = LocalDate.now().getMonthValue();
            int currentYear = LocalDate.now().getYear();

            Optional<MonthlyUsage> monthlyUsage = monthlyUsages.stream()
                    .filter(usage -> usage.getYear() <= currentYear
                            && (usage.getYear() < currentYear || usage.getMonth() <= currentMonth))
                    .max(Comparator.comparing(MonthlyUsage::getYear).thenComparing(MonthlyUsage::getMonth));

            if (monthlyUsage.isPresent()) {
                log.info("monthlyUsage: {}", monthlyUsage.get().getUsage());
                log.info("request.getUsage(): {}", request.getUsage());
                log.info("monthlyUsage: {}", monthlyUsage.get().getUsage().compareTo(request.getUsage()));
                if (monthlyUsage.get().getUsage().compareTo(request.getUsage()) > 0) {
                    log.info("1");
                    throw new AppException(ErrorCode.INVALID_USAGE);
                }
            }

            cost = monthlyUsage
                    .map(usage ->
                            additionalCost.getCost().multiply(request.getUsage().subtract(usage.getUsage())))
                    .orElseGet(() -> additionalCost.getCost().multiply(request.getUsage()));
            //            cost = additionalCost.getCost().multiply(request.getUsage());
            //            return null;
        } else if (additionalCost
                .getAdditionalCostType()
                .getName()
                .equals(AdditionalCostTypes.PERSONNEL_COST_PER_MONTH.toString())) {
            cost = additionalCost.getCost().multiply(BigDecimal.valueOf(room.getCurrentOccupancy()));
            request.setUsage(new BigDecimal(room.getCurrentOccupancy()));
        } else {
            throw new IllegalArgumentException("INVALID_ADDITIONAL_COST_TYPE");
        }

        MonthlyUsage monthlyUsage = MonthlyUsage.builder()
                .additionalCost(additionalCost)
                .usage(request.getUsage())
                .year(request.getYear())
                .month(request.getMonth())
                .cost(cost)
                .roomId(request.getRoomId())
                .invoice(invoiceOpt.orElse(null))
                .price(additionalCost.getCost())
                .build();

        log.info("invoiceOpt: {}", monthlyUsage);

        if (invoiceOpt.isPresent()) {
            if (!invoiceOpt.get().getPendingInvoice()) {
                throw new AppException(ErrorCode.INVOICE_COMPLETED);
            }
            Invoice invoice = invoiceOpt.get();
            invoice.getMonthlyUsages().add(monthlyUsage);
            monthlyUsage.setInvoice(invoice);
            invoiceRepository.save(invoice);

            return MonthlyUsageMapper.toMonthlyUsageCreationResponse(monthlyUsageRepository.save(monthlyUsage));

        } else {
            Invoice newInvoice = Invoice.builder()
                    .month(request.getMonth())
                    .year(request.getYear())
                    .room(room)
                    .monthlyUsages(Set.of(monthlyUsage))
                    .pendingInvoice(true)
                    .contract(contract)
                    .build();
            monthlyUsage.setInvoice(newInvoice);
            invoiceRepository.save(newInvoice);

            return MonthlyUsageMapper.toMonthlyUsageCreationResponse(monthlyUsage);
        }
    }
}
