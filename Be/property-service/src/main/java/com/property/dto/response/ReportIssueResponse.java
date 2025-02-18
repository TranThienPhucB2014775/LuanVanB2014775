package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReportIssueResponse {

    String roomId;
    String apartmentId;
    String roomTypeId;
    String tenantId;
    String title;
    String description;
    String status;
    String reportIssueId;
}
