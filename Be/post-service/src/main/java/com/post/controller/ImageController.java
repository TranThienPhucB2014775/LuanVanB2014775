package com.post.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.post.dto.ApiResponse;
import com.post.service.ImageService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/image")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ImageController {

    ImageService imageService;

    @PostMapping
    public ApiResponse<String> uploadImage(
            @RequestParam("images") List<MultipartFile> images, @RequestParam("postId") String postId) {
        log.info("Image uploaded");
        imageService.uploadImage(images, postId);
        return ApiResponse.<String>builder().result("Image uploaded").build();
    }

    @DeleteMapping("/{imageId}")
    public ApiResponse<String> deleteImage(@PathVariable String imageId) {
        log.info("Image deleted with id: {}", imageId);
        imageService.deleteImage(imageId);
        return ApiResponse.<String>builder()
                .result("Image deleted with id: " + imageId)
                .build();
    }

    @PutMapping("/{imageId}")
    public ApiResponse<String> updateImage(@PathVariable String imageId, @RequestParam("image") MultipartFile image) {
        log.info("Image updated with id: {}", imageId);
        imageService.updateImage(image, imageId);
        return ApiResponse.<String>builder()
                .result("Image updated with id: " + imageId)
                .build();
    }
}
