package com.property.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import com.property.constant.AdditionalCostTypes;
import com.property.validation.AdditionalCostTypeSubset;

import lombok.Getter;

@Getter
public class AdditionalCostUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String additionalCostId;

    @NotNull(message = "INVALID_VALUE")
    String name;

    @NotNull(message = "INVALID_VALUE")
    BigDecimal cost;

    @AdditionalCostTypeSubset(
            anyOf = {
                AdditionalCostTypes.ROOM_COST_PER_MONTH,
                AdditionalCostTypes.UNIT_COST_PER_MONTH,
                AdditionalCostTypes.PERSONNEL_COST_PER_MONTH
            },
            message = "INVALID_ADDITIONAL_COST_TYPE")
    String additionalCostType;

    @NotNull(message = "INVALID_VALUE")
    String unit;
}
