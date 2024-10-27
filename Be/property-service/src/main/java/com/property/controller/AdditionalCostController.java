package com.property.controller;

import com.property.dto.request.AdditionalCostUnrecordedRequest;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.AdditionalCostCreationRequest;
import com.property.dto.request.AdditionalCostUpdateRequest;
import com.property.dto.response.AdditionalCostResponse;
import com.property.dto.response.ListResponse;
import com.property.service.AdditionalCostService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/additional-cost")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AdditionalCostController {
    AdditionalCostService additionalCostService;

    @PostMapping
    public ResponseEntity<ApiResponse<AdditionalCostResponse>> createAdditionalCost(
            @RequestBody @Valid AdditionalCostCreationRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<AdditionalCostResponse>builder()
                        .result(additionalCostService.createAdditionalCost(request))
                        .build());
    }

    @PutMapping
    public ResponseEntity<ApiResponse<AdditionalCostResponse>> updateAdditionalCost(
            @RequestBody @Valid AdditionalCostUpdateRequest request) {

        log.info("Updating additional cost");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<AdditionalCostResponse>builder()
                        .result(additionalCostService.updateAdditionalCost(request))
                        .build());
    }

    @DeleteMapping("/{additionalCostId}")
    public ResponseEntity deleteAdditionalCost(
            @PathVariable String additionalCostId
    ) {
        log.info("Deleting additional cost");
        additionalCostService.removeAdditionalCost(additionalCostId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{apartmentId}")
    public ResponseEntity<ApiResponse<AdditionalCostResponse>> getAdditionalCost(@PathVariable String apartmentId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<AdditionalCostResponse>builder()
                        .result(additionalCostService.getAdditionalCost(apartmentId))
                        .build());
    }

    @PostMapping("/unrecorded/{roomId}")
    public ResponseEntity<ApiResponse<ListResponse<AdditionalCostResponse>>> getUnrecordedAdditionalCost(
            @PathVariable String roomId,
            @RequestBody @Valid AdditionalCostUnrecordedRequest request
    ) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<ListResponse<AdditionalCostResponse>>builder()
                        .result(additionalCostService.getUnrecordedAdditionalCost(roomId, request))
                        .build());
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<ListResponse<AdditionalCostResponse>>> getAllAdditionalCost(
            @RequestParam(defaultValue = "0", required = false) int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) String apartmentId,
            @RequestParam(defaultValue = "", required = false) String additionalCostType,
            @RequestParam(defaultValue = "true", required = false) Boolean isAvailable){

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<ListResponse<AdditionalCostResponse>>builder()
                        .result(additionalCostService.getAllAdditionalCost(
                                pageNum, pageSize, sortBy, order, search, apartmentId, additionalCostType))
                        .build());
    }
}
