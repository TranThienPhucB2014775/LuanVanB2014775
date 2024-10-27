package com.property.mapper;

import com.property.dto.request.ReportIssueRequest;
import com.property.dto.response.ReportIssueResponse;
import com.property.entity.ReportIssue;
import com.property.entity.Room;

public class ReportIssueMapper {
    public static ReportIssue toReportIssue(ReportIssueRequest request) {
        return ReportIssue.builder()
                .tenantId(request.getRoomId())
                .title(request.getTitle())
                .description(request.getDescription())
                .build();
    }

    public static ReportIssueResponse toReportIssueResponse(ReportIssue reportIssue, Room room) {
        return ReportIssueResponse.builder()
                .tenantId(reportIssue.getTenantId())
                .title(reportIssue.getTitle())
                .description(reportIssue.getDescription())
                .status(reportIssue.getStatus())
                .roomId(reportIssue.getRoom().getRoomId())
                .reportIssueId(reportIssue.getReportIssueId())
                .apartmentId(room.getRoomType().getApartment().getApartmentId())
                .roomTypeId(room.getRoomType().getRoomTypeId())
                .build();
    }
}
