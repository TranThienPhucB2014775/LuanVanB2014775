package com.identity.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.identity.dto.ApiResponse;
import com.identity.dto.Response.UpdateAndCreateAvatarResponse;
import com.identity.service.UserService;

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

    UserService userService;

    @PutMapping
    public ApiResponse<?> updateAvatar(
            @RequestParam("image") MultipartFile file, @RequestHeader(value = "Authorization") String token) {
        return ApiResponse.<UpdateAndCreateAvatarResponse>builder()
                .result(userService.UpdateAvatar(file, token.replace("Bearer ", "")))
                .build();
    }

    @DeleteMapping
    public ApiResponse<?> deleteImage(@RequestParam("id") String id) {
        return null;
    }
}
