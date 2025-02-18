package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum DiscountUnit {
    @JsonProperty("PERCENTAGE")
    PERCENTAGE,
    @JsonProperty("AMOUNT")
    AMOUNT
}
