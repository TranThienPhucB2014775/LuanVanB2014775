package com.identity.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum Roles {
    @JsonProperty("LANDLORD")
    LANDLORD,
    @JsonProperty("TENANT")
    TENANT,
    @JsonProperty("ADMIN")
    ADMIN
}
