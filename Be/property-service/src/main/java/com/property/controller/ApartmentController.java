package com.property.controller;

import com.property.dto.ApiResponse;
import com.property.dto.request.apartmentCreationRequest;
import com.property.dto.request.apartmentDeleteAndEnableRequest;
import com.property.dto.request.apartmentUpdateRequest;
import com.property.dto.response.ApartmentResponse;
import com.property.dto.response.ListResponse;
import com.property.service.ApartmentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apartment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApartmentController {

    ApartmentService apartmentService;

    @PostMapping
    public ResponseEntity<ApiResponse<ApartmentResponse>> createApartment(
            @Valid @RequestBody apartmentCreationRequest request,
            @RequestHeader("Authorization") String token
    ) {
        return ResponseEntity.status(201).body(
                ApiResponse.<ApartmentResponse>builder()
                        .result(apartmentService.createApartment(request, token.replace("Bearer ", "")))
                        .build()
        );
    }

    @PutMapping
    public ApiResponse<ApartmentResponse> updateApartment(
            @Valid @RequestBody apartmentUpdateRequest request,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Updating apartment");

        return ApiResponse.<ApartmentResponse>builder()
                .result(apartmentService.updateApartment(request, token.replace("Bearer ", "")))
                .build();
    }

    @DeleteMapping("/{apartmentId}")
    public ResponseEntity<?> deleteApartment(
            @PathVariable String apartmentId,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Deleting apartment");
        apartmentService.deleteApartment(apartmentId, token.replace("Bearer ", ""));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @PatchMapping("/{apartmentId}/enable")
    public ResponseEntity<?> enableApartment(
            @PathVariable String apartmentId,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Enabling apartment");
        apartmentService.enableApartment(apartmentId, token.replace("Bearer ", ""));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @GetMapping("/{apartmentId}")
    public ApiResponse<ApartmentResponse> getApartment(
            @PathVariable String apartmentId
    ) {

        return ApiResponse.<ApartmentResponse>builder()
                .result(apartmentService.getApartment(apartmentId))
                .build();
    }


    @GetMapping
    public ApiResponse<ListResponse<ApartmentResponse>> getAllApartments(
            @RequestParam(defaultValue = "0", required = false) int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) Boolean isAvailable,
            @RequestParam(defaultValue = "", required = false) String city,
            @RequestParam(defaultValue = "", required = false) String userId

    ) {
        log.info("Getting all apartments");

        return ApiResponse.<ListResponse<ApartmentResponse>>builder()
                .result(apartmentService.getAllApartments(
                        pageNum,
                        pageSize,
                        sortBy,
                        order,
                        search,
                        isAvailable,
                        city,
                        userId
                ))
                .build();
    }
}
