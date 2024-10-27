package com.property.constant;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ReportIssueStatus {
    @JsonProperty("PENDING")
    PENDING,

    @JsonProperty("IN_PROGRESS")
    IN_PROGRESS,

    @JsonProperty("RESOLVED")
    RESOLVED,

    @JsonProperty("CLOSED")
    CLOSED
}
