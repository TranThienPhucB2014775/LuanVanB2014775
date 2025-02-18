package com.property.service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import com.property.dto.response.TotalInvoiceResponse;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.property.dto.response.InvoiceUnpaidResponse;
import com.property.dto.response.SummaryResponse;
import com.property.repository.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class SummaryService {

    ApartmentRepository apartmentRepository;
    RoomTypeRepository roomTypeRepository;
    RoomRepository roomRepository;
    TenantRepository tenantRepository;
    InvoiceRepository invoiceRepository;

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public SummaryResponse getSummary(
            String roomId, String roomTypeId, String apartmentId,
            String month, String year, int months
    ) {

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        log.info("Getting summary for user: {}", userId);

        BigDecimal totalIncome =
                invoiceRepository.findTotalIncomeByUserId(userId).orElse(BigDecimal.ZERO);

        log.info("Total income: {}", totalIncome);

        return SummaryResponse.builder()
                .totalApartments(apartmentRepository.countAllByUserId(userId))
                .totalRoomTypes(roomTypeRepository.countAllByUserId(userId))
                .totalRooms(roomRepository.countAllByUserId(userId))
                .totalTenants(tenantRepository.countTenantsByApartmentIdOrRoomTypeIdAndUserIdAndContractIsAvailable(
                        null, null, userId))
                .totalIncome(totalIncome)
//                .totalInvoiceResponses(invoiceRepository.findTotalInvoiceResponsesForLast6Months(
//                        userId, roomId, roomTypeId, apartmentId))
                .build();
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public Collection<TotalInvoiceResponse> MonthlyRevenueStats(
            String roomId, String roomTypeId, String apartmentId,
            String month, String year, int months
    ) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (month == null || year == null) {
            Calendar calendar = Calendar.getInstance();
            int currentMonth = calendar.get(Calendar.MONTH) + 1; // Calendar.MONTH là 0-based
            int currentYear = calendar.get(Calendar.YEAR);

            int startMonth = currentMonth - 7;
            if (startMonth <= 0) {
                startMonth += 12;
                currentYear--;
            }

            month = String.valueOf(startMonth);
            year = String.valueOf(currentYear);
        }

        int parsedMonth = Integer.parseInt(month);
        int parsedYear = Integer.parseInt(year);

        if (parsedMonth < 1 || parsedMonth > 12) {
            throw new AppException(ErrorCode.INVALID_VALUE);
        }

        Pageable pageable = PageRequest.of(0, months);

        return invoiceRepository.findTotalInvoiceResponsesFromStartMonth(
                userId, parsedMonth, parsedYear, roomId, roomTypeId, apartmentId, pageable);
    }


    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public InvoiceUnpaidResponse getUnpaidInvoiceSummary(String roomId, String roomTypeId, String apartmentId) {
        return invoiceRepository.countUnpaidInvoices(
                SecurityContextHolder.getContext().getAuthentication().getName(), apartmentId, roomTypeId, roomId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public SummaryResponse getAdminSummary() {
        return SummaryResponse.builder()
                .totalApartments(apartmentRepository.count())
                .totalRoomTypes(roomTypeRepository.count())
                .totalRooms(roomRepository.count())
                .totalTenants(tenantRepository.countAllTenant())
                .totalIncome(null)
                .build();
    }
}
