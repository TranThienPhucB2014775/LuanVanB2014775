package com.property.dto.request;

import com.property.constant.ReportIssueStatus;
import com.property.validation.ReportIssueTypeSubset;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class ReportIssueUpdateRequest {
    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String reportIssueId;

    @ReportIssueTypeSubset(anyOf = {
            ReportIssueStatus.PENDING,
            ReportIssueStatus.IN_PROGRESS,
            ReportIssueStatus.RESOLVED,
            ReportIssueStatus.CLOSED
    }, message = "INVALID_REPORT_ISSUE_TYPE")
    String status;
}
