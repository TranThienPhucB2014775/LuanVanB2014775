package com.property.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
