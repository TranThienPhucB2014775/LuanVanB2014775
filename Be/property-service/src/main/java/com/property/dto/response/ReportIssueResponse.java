package com.property.dto.response;

import com.property.constant.ReportIssueStatus;
import com.property.validation.ReportIssueTypeSubset;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
