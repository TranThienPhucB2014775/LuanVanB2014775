package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.JoinColumn;

public enum DiscountUnit {
    @JsonProperty("PERCENTAGE")
    PERCENTAGE,
    @JsonProperty("AMOUNT")
    AMOUNT
}