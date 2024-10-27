package com.property.controller;

import com.property.dto.ApiResponse;
import com.property.dto.request.MonthlyUsageCreationRequest;
import com.property.dto.response.MonthlyUsageCreationResponse;
import com.property.service.MonthlyUsageService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/monthly-usage")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class MonthlyUsageController {

    MonthlyUsageService monthlyUsageService;

    @PostMapping
    public ResponseEntity<ApiResponse<MonthlyUsageCreationResponse>> createMonthlyUsage(
            @RequestBody @Valid MonthlyUsageCreationRequest request
    ) {

        log.info("Creating monthly usage for additional cost id: {}", request.toString());

       return ResponseEntity
               .status(201)
               .body(ApiResponse.<MonthlyUsageCreationResponse>builder()
                       .result(monthlyUsageService.saveMonthlyUsage(request))
                       .build());
    }

}
