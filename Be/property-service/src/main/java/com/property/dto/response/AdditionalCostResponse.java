package com.property.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AdditionalCostResponse {

    String name;

    BigDecimal cost;
    String AdditionalCostType;
    String unit;

    String additionalCostId;
}
