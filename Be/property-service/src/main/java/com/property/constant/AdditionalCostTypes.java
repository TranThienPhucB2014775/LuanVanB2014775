package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum AdditionalCostTypes {

    @JsonProperty("PERSONNEL_COST_PER_MONTH ")
    PERSONNEL_COST_PER_MONTH,

    @JsonProperty("UNIT_COST_PER_MONTH")
    UNIT_COST_PER_MONTH,

    @JsonProperty("ROOM_COST_PER_MONTH")
    ROOM_COST_PER_MONTH,
}
