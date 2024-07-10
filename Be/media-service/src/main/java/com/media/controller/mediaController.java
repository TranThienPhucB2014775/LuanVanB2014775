package com.media.controller;

import com.media.dto.ApiResponse;
import com.media.dto.Response.CreateImageResponse;
import com.media.dto.Response.UpdateImageResponse;
import com.media.exception.AppException;
import com.media.exception.ErrorCode;
//import com.media.service.CloudinaryService;
import com.media.service.FirebaseStorageService;
import com.media.service.ImageService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/avatar")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class mediaController {

    //    private final CloudinaryService cloudinaryService;
    private final FirebaseStorageService FirebaseStorageService;
    private final ImageService imageService;

    @PostMapping
    public ApiResponse<CreateImageResponse> createImage(@RequestParam("image") MultipartFile file) {
        return ApiResponse.<CreateImageResponse>builder()
                .result(FirebaseStorageService.upload(file))
                .build();
    }

    @PutMapping
    public ApiResponse<UpdateImageResponse> updateImage(
            @RequestParam("image") MultipartFile file
    ) {
        try {
            return ApiResponse.<UpdateImageResponse>builder()
                    .result(FirebaseStorageService.updateImage(file))
                    .build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.CLOUDINARY_EXCEPTION);
        }
    }
//
//    @DeleteMapping
//    public ApiResponse<?> deleteImage(@RequestParam("id") String id) {
//        try {
//            cloudinaryService.deleteImage(id);
//            return ApiResponse.builder()
//                    .result("Delete image successfully")
//                    .build();
//        } catch (Exception e) {
//            throw new AppException(ErrorCode.CLOUDINARY_EXCEPTION);
//        }
//    }
}
