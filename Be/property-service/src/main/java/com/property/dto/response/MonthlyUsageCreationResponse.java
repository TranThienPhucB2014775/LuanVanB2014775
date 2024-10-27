package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class MonthlyUsageCreationResponse {
    int month;

    int year;

    String additionalCostId;

    BigDecimal cost;

    BigDecimal usage;

    AdditionalCostResponse additionalCostResponse;
}
