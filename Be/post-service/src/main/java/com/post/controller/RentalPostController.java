package com.post.controller;

import com.post.dto.ApiResponse;
import com.post.dto.request.RentalPostCreationRequest;
import com.post.dto.request.RentalPostReportRequest;
import com.post.dto.request.RentalPostUpdateRequest;
import com.post.dto.response.ListPostResponse;
import com.post.dto.response.RentalPostDetailResponse;
import com.post.dto.response.RentalPostListResponse;
import com.post.service.RentalPostService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/rental-post")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RentalPostController {
    RentalPostService rentalPostService;

    @PostMapping
    public ApiResponse<RentalPostDetailResponse> createRentalPost(
            @RequestParam("images") List<MultipartFile> images,
            @RequestParam String city,
            @RequestParam String district,
            @RequestParam String address,
            @RequestParam String ward,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) String amenities,
            @RequestParam(required = false) Integer area,
            @RequestParam(required = false) String tenantType,
            @RequestParam long price,
            @RequestParam String rentalType,
            @RequestHeader("Authorization") String token
    ) {
        RentalPostCreationRequest request = RentalPostCreationRequest.builder()
                .city(city)
                .district(district)
                .address(address)
                .ward(ward)
                .title(title)
                .description(description)
                .amenities(amenities)
                .area(area)
                .tenantType(tenantType)
                .price(price)
                .rentalType(rentalType)
                .build();
        log.info("{}", request.toString());
        return ApiResponse.<RentalPostDetailResponse>builder()
                .result(rentalPostService.createRentalPost(request, token, images))
                .build();
    }

    @PostMapping("/report")
    public ApiResponse<String> reportRentalPost(
            @RequestBody @Valid RentalPostReportRequest request
    ) {
        log.info("Reporting rental post");

        rentalPostService.reportRentalPost(request);

        return ApiResponse.<String>builder()
                .result("Reported")
                .build();
    }

    @PutMapping
    public ApiResponse<RentalPostDetailResponse> updateRentalPost(
            @RequestBody @Valid RentalPostUpdateRequest request,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Updating rental post");
        return ApiResponse.<RentalPostDetailResponse>builder()
                .result(rentalPostService.updateRentalPost(request, token))
                .build();
    }

    @PutMapping("/{rentalPostId}")
    public ApiResponse<String> updateRentalPostStatus(
            @PathVariable String rentalPostId
    ) {
        log.info("Updating rental post status");
        rentalPostService.updateRentalPostStatus(rentalPostId);
        return ApiResponse.<String>builder()
                .result("Updated")
                .build();
    }

    @DeleteMapping("/{rentalPostId}")
    public ApiResponse<String> deleteRentalPost(
            @PathVariable String rentalPostId
    ) {
        log.info("Deleting rental post");
        rentalPostService.deleteRentalPost(rentalPostId);

        return ApiResponse.<String>builder()
                .result("Deleted")
                .build();
    }

    @GetMapping("/{rentalPostId}")
    public ApiResponse<RentalPostDetailResponse> getRentalPost(
            @PathVariable String rentalPostId
    ) {
        log.info("Getting rental post");
        return ApiResponse.<RentalPostDetailResponse>builder()
                .result(rentalPostService.getRentalPost(rentalPostId))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<?> getAllRentalPosts(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "4", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(required = false) String search,
            @RequestParam(required = false, defaultValue = "true") Boolean isAvailable,
            @RequestParam(required = false) String tenantType,
            @RequestParam(required = false) String userId,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) Integer minArea,
            @RequestParam(required = false) Integer maxArea,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String district,
            @RequestParam(required = false) String ward
    ) {

        log.info("Getting all rental posts");

        if (isInvalidRange(minPrice, maxPrice)) {
            return ApiResponse.builder().result("Giá không hợp lệ.").build();
        }

        if (isInvalidRange(minArea != null ? maxArea.intValue() : null, maxArea != null ? maxArea.intValue() : null)) {
            return ApiResponse.builder().result("Diện tích không hợp lệ.").build();
        }

        return ApiResponse.<ListPostResponse<RentalPostListResponse>>builder()
                .result(rentalPostService.getAllRentalPosts(
                        pageNum,
                        pageSize,
                        order,
                        sortBy,
                        search,
                        isAvailable,
                        tenantType,
                        userId,
                        minPrice,
                        maxPrice,
                        minArea,
                        maxArea,
                        city,
                        district,
                        ward
                ))
                .build();
    }

    private boolean isInvalidRange(Integer min, Integer max) {
        if (min != null && min < 0) {
            return true;
        }
        if (max != null && max < 0) {
            return true;
        }
        return min != null && max != null && min > max;
    }
}
