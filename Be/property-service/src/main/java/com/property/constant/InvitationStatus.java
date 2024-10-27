package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum InvitationStatus {
    @JsonProperty("PENDING")
    PENDING,

    @JsonProperty("REFUSED")
    REFUSED,

    @JsonProperty("ACCEPTED")
    ACCEPTED,

    @JsonProperty("DISABLED")
    DISABLED
}
