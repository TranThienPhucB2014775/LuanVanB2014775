package com.property.controller;

import com.property.dto.request.ApartmentRatingCreationRequest;
import com.property.dto.request.ApartmentReportRequest;
import com.property.dto.response.FeedBackResponse;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.ApartmentCreationRequest;
import com.property.dto.request.ApartmentUpdateRequest;
import com.property.dto.response.ApartmentResponse;
import com.property.dto.response.ListResponse;
import com.property.service.ApartmentService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/apartment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApartmentController {

    ApartmentService apartmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<ApartmentResponse>> createApartment(
            @Valid @RequestBody ApartmentCreationRequest request) {
        return ResponseEntity.status(201)
                .body(ApiResponse.<ApartmentResponse>builder()
                        .result(apartmentService.createApartment(request))
                        .build());
    }

    @PostMapping("/report")
    public ApiResponse<String> reportApartment(
            @RequestBody ApartmentReportRequest request
    ) {
        apartmentService.reportApartment(request);
        return ApiResponse.<String>builder()
                .result("Apartment reported successfully")
                .build();
    }

    @PostMapping("/rating")
    public ResponseEntity<ApiResponse<FeedBackResponse>> rateApartment(
            @Valid @RequestBody ApartmentRatingCreationRequest request,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.status(201)
                .body(apartmentService.createRating(request, token.replace("Bearer ", "")));
    }

    @PutMapping
    public ApiResponse<ApartmentResponse> updateApartment(@Valid @RequestBody ApartmentUpdateRequest request) {
        log.info("Updating apartment");

        return ApiResponse.<ApartmentResponse>builder()
                .result(apartmentService.updateApartment(request))
                .build();
    }

    @DeleteMapping("/{apartmentId}")
    public ResponseEntity<?> deleteApartment(@PathVariable String apartmentId) {
        log.info("Deleting apartment");
        apartmentService.deleteApartment(apartmentId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @PatchMapping("/{apartmentId}/enable")
    public ResponseEntity<?> enableApartment(@PathVariable String apartmentId) {
        log.info("Enabling apartment");
        apartmentService.enableApartment(apartmentId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @GetMapping("/{apartmentId}")
    public ApiResponse<ApartmentResponse> getApartment(@PathVariable String apartmentId) {

        return ApiResponse.<ApartmentResponse>builder()
                .result(apartmentService.getApartment(apartmentId))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListResponse<ApartmentResponse>> getAllApartments(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) Boolean isAvailable,
            @RequestParam(defaultValue = "", required = false) String city,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(defaultValue = "", required = false) String apartmentType) {

        log.info("Getting all apartments");

        return ApiResponse.<ListResponse<ApartmentResponse>>builder()
                .result(apartmentService.getAllApartments(
                        pageNum, pageSize, sortBy, order, search, isAvailable, city, userId, apartmentType))
                .build();
    }
}
