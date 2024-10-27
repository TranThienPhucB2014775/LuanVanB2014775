package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public enum RentStatus {
    @JsonProperty("AVAILABLE")
    AVAILABLE,
    @JsonProperty("RENTED")
    RENTED,
    @JsonProperty("RESERVED")
    RESERVED;
}
