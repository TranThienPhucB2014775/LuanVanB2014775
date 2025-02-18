package com.property.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
