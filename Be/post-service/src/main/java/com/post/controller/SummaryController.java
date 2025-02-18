package com.post.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.post.dto.ApiResponse;
import com.post.dto.response.SummaryResponse;
import com.post.service.SummaryService;

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
    public ApiResponse<SummaryResponse> getSummary() {
        return ApiResponse.<SummaryResponse>builder()
                .result(summaryService.getSummary())
                .build();
    }
}
