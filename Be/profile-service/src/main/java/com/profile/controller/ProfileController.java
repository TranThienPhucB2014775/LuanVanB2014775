package com.profile.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;

import com.profile.dto.ApiResponse;
import com.profile.dto.Request.ProfileCreationRequest;
import com.profile.dto.Request.ProfileUpdateRequest;
import com.profile.dto.Response.ProfileResponse;
import com.profile.service.ProfileService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProfileController {

    ProfileService profileService;

    @PostMapping
    ApiResponse<ProfileResponse> createProfile(@Valid @RequestBody ProfileCreationRequest profileCreationRequest) {
        return ApiResponse.<ProfileResponse>builder()
                .code(0)
                .result(profileService.createProfile(profileCreationRequest))
                .build();
    }

    @GetMapping("{id}")
    ApiResponse<ProfileResponse> getProfile(@PathVariable String id) {
        return ApiResponse.<ProfileResponse>builder()
                .code(0)
                .result(profileService.getProfile(id))
                .build();
    }

    @PostMapping("/update")
    ApiResponse<ProfileResponse> updateProfile(
            @Valid @RequestBody ProfileUpdateRequest profileUpdateRequest,
            @RequestHeader(value = "Authorization", defaultValue = "") String token) {
        log.info("2" + token);
        return ApiResponse.<ProfileResponse>builder()
                .code(0)
                .result(profileService.updateProfile(profileUpdateRequest, token.replace("Bearer ", "")))
                .build();
    }

    @GetMapping("/get-all")
    ApiResponse<List<ProfileResponse>> getAllProfiles() {
        return ApiResponse.<List<ProfileResponse>>builder()
                .code(0)
                .result(profileService.getAllProfiles())
                .build();
    }
}
