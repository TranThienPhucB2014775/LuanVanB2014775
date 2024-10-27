package com.interact.controller;

import org.springframework.web.bind.annotation.*;

import com.interact.dto.ApiResponse;
import com.interact.dto.response.ListResponse;
import com.interact.dto.response.ReportResponse;
import com.interact.service.ReportService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/report")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportController {

    ReportService reportService;

    @PutMapping("/{reportId}")
    ApiResponse<String> updateReport(@PathVariable String reportId) {

        log.info("Updating report {}", reportId);
        reportService.updateReport(reportId);

        return ApiResponse.<String>builder().result("success").build();
    }

    @GetMapping("/all/{pageNum}")
    ApiResponse<ListResponse<ReportResponse>> getAllReports(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "2", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(required = false, defaultValue = "") String userId,
            @RequestParam(required = false, defaultValue = "") String itemId,
            @RequestParam(required = false, defaultValue = "") Boolean isHandled,
            @RequestParam(required = false, defaultValue = "") String reportType,
            @RequestParam(required = false, defaultValue = "") String search) {
        log.info("Getting all reports");

        return ApiResponse.<ListResponse<ReportResponse>>builder()
                .result(reportService.getAllReports(
                        pageNum, pageSize, sortBy, order, userId, itemId, isHandled, reportType, search))
                .build();
    }
}
