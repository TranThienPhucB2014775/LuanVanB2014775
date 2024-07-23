package com.profile.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.profile.dto.ApiResponse;
import com.profile.service.ProfileService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AvatarController {

    ProfileService profileService;

    @PutMapping
    public ApiResponse<?> updateAvatar(
            @RequestHeader(value = "Authorization", defaultValue = "") String token,
            @RequestParam("image") MultipartFile file) {
        return ApiResponse.builder()
                .result(profileService.UpdateAvatar(file, token.replace("Bearer ", "")))
                .build();
    }

    @DeleteMapping
    public ApiResponse<?> deleteImage(@RequestParam("id") String id) {
        return null;
    }
}
