package com.identity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.identity.dto.ApiResponse;
import com.identity.dto.Response.SummaryResponse;
import com.identity.service.UserService;

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

    UserService userService;

    @GetMapping
    public ApiResponse<SummaryResponse> getSummary() {
        log.info("Get summary");
        return ApiResponse.<SummaryResponse>builder()
                .result(userService.getSummary())
                .build();
    }
}
