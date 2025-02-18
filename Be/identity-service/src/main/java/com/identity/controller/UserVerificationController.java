package com.identity.controller;

import org.springframework.web.bind.annotation.*;

import com.identity.dto.ApiResponse;
import com.identity.dto.Response.UserVerificationResponse;
import com.identity.service.UserVerificationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/verification")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserVerificationController {

    UserVerificationService userVerificationService;

    @GetMapping("/{userId}")
    public ApiResponse<UserVerificationResponse> getUserVerification(
            @PathVariable String userId, @RequestHeader("Authorization") String token) {
        return ApiResponse.<UserVerificationResponse>builder()
                .result(userVerificationService.findByUserId(userId, token))
                .build();
    }
}
