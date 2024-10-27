package com.post.controller;

import com.post.dto.ApiResponse;
import com.post.dto.request.TenantPostCreationRequest;
import com.post.dto.request.TenantPostUpdateRequest;
import com.post.dto.response.ListPostResponse;
import com.post.dto.response.ListResponse;
import com.post.dto.response.TenantPostResponse;
import com.post.service.TenantPostService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tenant-post")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TenantPostController {

    TenantPostService searchPostService;

    @PostMapping
    public ResponseEntity<ApiResponse<TenantPostResponse>> createTenantPost(
            @RequestBody @Valid TenantPostCreationRequest request
    ) {
        log.info("Creating search post");

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        ApiResponse.<TenantPostResponse>builder()
                                .result(searchPostService.createTenantPost(request))
                                .build());
    }

    @PutMapping
    public ApiResponse<TenantPostResponse> updateTenantPost(
            @RequestBody @Valid TenantPostUpdateRequest request
    ) {
        log.info("Updating search post");
        return ApiResponse.<TenantPostResponse>builder()
                .result(searchPostService.updateTenantPost(request))
                .build();
    }

    @DeleteMapping("/{tenantPostId}")
    public ApiResponse<String> deleteTenantPost(
            @PathVariable String tenantPostId
    ) {
        log.info("Deleting search post");
        searchPostService.deleteTenantPost(tenantPostId);
        return ApiResponse.<String>builder()
                .result("Deleted")
                .build();
    }

    @PutMapping("/{tenantPostId}")
    public ApiResponse getTenantPost(@PathVariable String tenantPostId) {
        log.info("Getting search post");
        searchPostService.enableTenantPost(tenantPostId);
        return ApiResponse.builder()
                .result("Enabled")
                .build();
    }

    @GetMapping("/{tenantPostId}")
    public ApiResponse<TenantPostResponse> getTenantPostById(@PathVariable String tenantPostId) {
        log.info("Getting search post by id");
        return ApiResponse.<TenantPostResponse>builder()
                .result(searchPostService.getTenantPostById(tenantPostId))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListPostResponse<TenantPostResponse>> getTenantPost(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "4", required = false) int pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "true") Boolean isAvailable,
            @RequestParam(required = false) String tenantPostType,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String ward
    ) {

        return ApiResponse.<ListPostResponse<TenantPostResponse>>builder()
                .result(
                        searchPostService.getTenantPost(
                                pageNum, pageSize, search,
                                tenantPostType, userId,
                                minPrice, maxPrice,
                                city, district, ward,
                                isAvailable
                        )
                )
                .build();

    }
}
