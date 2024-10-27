package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@Builder
public class InvoiceResponse {
    BigDecimal cost;

    BigDecimal discount;

    String discountType;

    Set<MonthlyUsageResponse> monthlyUsageResponses;

    Boolean pendingInvoice;

}
