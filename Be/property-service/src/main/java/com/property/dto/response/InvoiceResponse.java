package com.property.dto.response;

import java.math.BigDecimal;
import java.util.Set;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class InvoiceResponse {
    BigDecimal cost;

    BigDecimal discount;

    String discountType;

    Set<MonthlyUsageResponse> monthlyUsageResponses;

    Boolean pendingInvoice;

    Boolean isPaid;

    int month;
    int year;
}
