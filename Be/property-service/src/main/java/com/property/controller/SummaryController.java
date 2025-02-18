package com.property.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.property.dto.ApiResponse;
import com.property.service.SummaryService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/summary")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SummaryController {
    SummaryService summaryService;

    @GetMapping
    public ApiResponse<?> getSummary(
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) String roomTypeId,
            @RequestParam(required = false) String apartmentId,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) String year,
            @RequestParam(required = false, defaultValue = "6") int months
            ) {
        return ApiResponse.builder()
                .result(summaryService.getSummary(
                        roomId, roomTypeId, apartmentId,
                        month, year, months
                ))
                .build();
    }

    @GetMapping("/monthly-revenue-stats")
    public ApiResponse<?> getMonthlyRevenueStats(
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) String roomTypeId,
            @RequestParam(required = false) String apartmentId,
            @RequestParam(required = false) String month,
            @RequestParam(required = false) String year,
            @RequestParam(required = false, defaultValue = "6") int months
    ) {
        return ApiResponse.builder()
                .result(summaryService.MonthlyRevenueStats(
                        roomId, roomTypeId, apartmentId,
                        month, year, months
                ))
                .build();
    }

    @GetMapping("/invoice-unpaid")
    public ApiResponse<?> getUnpaidInvoiceSummary(
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) String roomTypeId,
            @RequestParam(required = false) String apartmentId) {
        log.info("Getting unpaid invoice summary");
        return ApiResponse.builder()
                .result(summaryService.getUnpaidInvoiceSummary(roomId, roomTypeId, apartmentId))
                .build();
    }

    @GetMapping("/admin")
    public ApiResponse<?> getAdminSummary() {
        log.info("Getting admin summary");
        return ApiResponse.builder().result(summaryService.getAdminSummary()).build();
    }
}
