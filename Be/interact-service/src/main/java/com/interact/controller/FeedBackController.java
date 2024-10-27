package com.interact.controller;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.interact.dto.ApiResponse;
import com.interact.dto.request.FeedBackCreationRequest;
import com.interact.dto.request.FeedBackUpdateRequest;
import com.interact.dto.response.FeedBackResponse;
import com.interact.dto.response.FeedBackResponses;
import com.interact.service.FeedBackService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/feedback")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FeedBackController {

    FeedBackService feedBackService;

    @PostMapping
    ResponseEntity<ApiResponse<FeedBackResponse>> createFeedBack(@RequestBody @Valid FeedBackCreationRequest request) {

        return ResponseEntity.status(201)
                .body(ApiResponse.<FeedBackResponse>builder()
                        .result(feedBackService.saveFeedBack(request))
                        .build());
    }

    @PutMapping
    ApiResponse<FeedBackResponse> updateFeedBack(@RequestBody @Valid FeedBackUpdateRequest request) {
        log.info("Updating feedback");
        return ApiResponse.<FeedBackResponse>builder()
                .result(feedBackService.updateFeedBack(request))
                .build();
    }

    @DeleteMapping("/{id}")
    ResponseEntity deleteFeedBack(@PathVariable String id) {
        log.info("Deleting feedback");
        feedBackService.deleteFeedBack(id);
        return ResponseEntity.status(204).build();
    }

    @PatchMapping("/{id}")
    ResponseEntity<ApiResponse<?>> enableFeedBack(@PathVariable String id) {
        log.info("Patching feedback");
        feedBackService.enableFeedBack(id);
        return ResponseEntity.status(204).build();
    }

    @GetMapping("/all/{pageNum}")
    ApiResponse<FeedBackResponses> getAllFeedBacks(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "12", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(required = false, defaultValue = "") String userId,
            @RequestParam(required = false, defaultValue = "") String itemId,
            @RequestParam(required = false, defaultValue = "") Boolean isAvailable,
            @RequestParam(required = false, defaultValue = "") String search) {
        log.info("Getting all feedbacks");
        return ApiResponse.<FeedBackResponses>builder()
                .result(feedBackService.getAllFeedBacks(
                        pageNum, pageSize, sortBy, order, search, isAvailable, userId, itemId))
                .build();
    }

    @GetMapping("/{pageNum}/{itemId}")
    ApiResponse<FeedBackResponses> getFeedBacksByItemId(
            @PathVariable String itemId,
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "5", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order) {
        return ApiResponse.<FeedBackResponses>builder()
                .result(feedBackService.getFeedBacksByItemId(itemId, pageNum, pageSize, sortBy, order))
                .build();
    }
}
