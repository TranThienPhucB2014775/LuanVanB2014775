package com.property.dto.response;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class MonthlyUsageResponse {

    BigDecimal cost;

    BigDecimal usage;

    String name;

    String costType;
    String unit;

    BigDecimal price;
}
