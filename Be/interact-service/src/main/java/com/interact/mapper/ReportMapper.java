package com.interact.mapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.event.dto.ReportCreationEvent;
import com.interact.dto.response.ReportResponse;
import com.interact.entity.Report;

public class ReportMapper {

    private static final Logger log = LoggerFactory.getLogger(ReportMapper.class);

    public static ReportResponse toReportResponse(Report report) {
        return ReportResponse.builder()
                .userId(report.getUserId())
                .itemId(report.getItemId())
                .isHandled(report.getIsHandled())
                .reportType(report.getReportType())
                .createdAt(report.getCreatedAt())
                .reportId(report.getReportId())
                .message(report.getMessage())
                .build();
    }

    public static Report toReport(ReportCreationEvent reportResponse, String userId) {
        log.info("Creating report {}", reportResponse);
        return Report.builder()
                .userId(userId)
                .itemId(reportResponse.getItemId())
                .isHandled(false)
                .reportType(reportResponse.getReportType())
                .message(reportResponse.getMessage())
                .build();
    }
}
