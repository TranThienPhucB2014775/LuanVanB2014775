package com.interact.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interact.dto.ApiResponse;
import com.interact.service.FeedBackService;

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

    FeedBackService feedBackService;

    public ApiResponse<?> getSummary() {
        return ApiResponse.builder().result(feedBackService.getSummary()).build();
    }
}
