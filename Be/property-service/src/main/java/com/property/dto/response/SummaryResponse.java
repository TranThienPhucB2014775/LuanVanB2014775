package com.property.dto.response;

import java.math.BigDecimal;
import java.util.Set;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class SummaryResponse {

    long totalApartments;
    long totalRoomTypes;
    long totalRooms;
    long totalTenants;
    BigDecimal totalIncome;

//    Set<TotalInvoiceResponse> totalInvoiceResponses;
}
