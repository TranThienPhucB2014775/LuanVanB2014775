package com.property.controller;

import com.property.dto.ApiResponse;
import com.property.dto.request.ReportIssueRequest;
import com.property.dto.request.ReportIssueUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.ReportIssueResponse;
import com.property.service.ReportIssueService;
import jakarta.validation.Valid;
import jakarta.ws.rs.PUT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report-issue")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportIssueController {

    ReportIssueService reportIssueService;

    @PostMapping
    public ApiResponse<ReportIssueResponse> reportIssue(
            @RequestBody @Valid ReportIssueRequest request
    ) {
        return ApiResponse.<ReportIssueResponse>builder()
                .result(reportIssueService.createReportIssue(request))
                .build();
    }

    @PutMapping
    public ApiResponse<ReportIssueResponse> updateIssueStatus(
            @RequestBody @Valid ReportIssueUpdateRequest request
    ) {
        return ApiResponse.<ReportIssueResponse>builder()
                .result(reportIssueService.updateReportIssue(request))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListResponse<ReportIssueResponse>> getReportedIssues(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String status,
            @RequestParam(defaultValue = "", required = false) String roomId,
            @RequestParam(defaultValue = "", required = false) String apartmentId,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(defaultValue = "", required = false) String landlordId,
            @RequestParam(defaultValue = "", required = false) String search

    ) {
        return ApiResponse.<ListResponse<ReportIssueResponse>>builder()
                .result(reportIssueService.getReportedIssues(
                        pageNum, pageSize, sortBy,
                        order, status, roomId, apartmentId,
                        userId, landlordId, search
                ))
                .build();
    }

}
