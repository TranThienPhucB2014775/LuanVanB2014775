package com.interact.dto.response;

import java.time.Instant;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReportResponse {

    String reportId;

    String userId;

    String itemId;

    String reportType;

    String message;

    Instant createdAt;

    Boolean isHandled;
}
