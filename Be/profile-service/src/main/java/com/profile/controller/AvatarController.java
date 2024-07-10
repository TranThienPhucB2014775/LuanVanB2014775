package com.profile.controller;

import com.profile.dto.ApiResponse;
import com.profile.service.ProfileService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AvatarController {

    ProfileService profileService;

    @PostMapping
    public ApiResponse<?> createImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam(value = "profileId") String ProfileId
    ) {
        return ApiResponse.builder()
                .result(profileService.createAndUpdateAvatar(file, ProfileId))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam("public_id") String public_id
    ) {
        return null;
    }

    @DeleteMapping
    public ApiResponse<?> deleteImage(@RequestParam("id") String id) {
        return null;
    }
}
