package com.identity.controller;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.UserVerificationUpdateRequest;
import com.identity.service.UserVerificationRequestService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/verification-request")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserVerificationRequestController {

    UserVerificationRequestService userVerificationRequestService;

    @PostMapping
    public ApiResponse<?> updateAvatar(
            @RequestParam("image") MultipartFile file,
            @RequestParam String cardId
    ) {
        log.info("UserVerificationController.updateAvatar: file={}, cardId={}", file, cardId);
        return ApiResponse.builder()
                .result(userVerificationRequestService.save(file, cardId))
                .build();
    }

    @PutMapping
    public ApiResponse<?> verifyUser(
            @RequestBody @Valid UserVerificationUpdateRequest request,
            @RequestHeader("Authorization") String token
    ) {
        return ApiResponse.builder().result(userVerificationRequestService.verifyUser(request, token)).build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<?> getAllUserVerificationRequest(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "9", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(required = false) Boolean isChecked, // Allow null values
            @RequestParam(required = false) Boolean isSuccessful // Allow null values
    ) {
        log.info("0");

        return ApiResponse.builder().result(
                userVerificationRequestService.getALl(
                        pageNum,
                        pageSize,
                        sortBy,
                        order,
                        search,
                        userId,
                        isChecked,
                        isSuccessful
                )
        ).build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getUserVerificationRequestById(
            @PathVariable String id
    ) {
        return ApiResponse.builder().result(userVerificationRequestService.getById(id)).build();
    }

    @GetMapping
    public ApiResponse<?> getUserVerificationRequestByUserId(
    ) {
        return ApiResponse.builder().result(userVerificationRequestService.get()).build();
    }

    @GetMapping("/has-permission")
    public ApiResponse<Boolean> hasPermissionToViewIdCard(
            @RequestParam String imgUrl,
            @RequestHeader("Authorization") String token
    ) {

        return ApiResponse.<Boolean>builder()
                .result(userVerificationRequestService.hasPermissionToViewIdCard(imgUrl, token))
                .build();
    }

}
