package com.interact.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;

@Getter
public enum FeedBackTypes {
    @JsonProperty("LANDLORD")
    LANDLORD,

    @JsonProperty("RENTAL_POST")
    RENTAL_POST,

    @JsonProperty("APARTMENT")
    APARTMENT,
}
