package com.property.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.FeedBackCreationRequest;
import com.property.dto.response.FeedBackResponse;

@FeignClient(name = "interact-service")
public interface InteractClient {

    @PostMapping(value = "feedback", consumes = "application/json")
    ApiResponse<FeedBackResponse> createRating(
            @RequestHeader("Authorization") String token, @RequestBody FeedBackCreationRequest request);
}
