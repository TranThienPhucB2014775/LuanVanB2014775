package com.identity.controller;

import com.identity.dto.ApiResponse;
import com.identity.dto.Response.UpdateAndCreateAvatarResponse;
import com.identity.service.UserService;
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

    UserService userService;

    @PostMapping
    public ApiResponse<UpdateAndCreateAvatarResponse> createImage(
            @RequestParam("image") MultipartFile file,
            @RequestParam(value = "email") String email,
            @RequestHeader(value = "Authorization") String token
    ) {
        return ApiResponse.<UpdateAndCreateAvatarResponse>builder()
                .result(userService.createAvatar(file, email, token))
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
