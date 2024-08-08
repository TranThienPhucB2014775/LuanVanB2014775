package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum ApartmentTypes {
    @JsonProperty("APARTMENT")
    APARTMENT,
    @JsonProperty("HOUSE")
    HOUSE,
    @JsonProperty("STUDIO")
    STUDIO,
    @JsonProperty("DORMITORY")
    DORMITORY,
    @JsonProperty("ROOM")
    ROOM
}
