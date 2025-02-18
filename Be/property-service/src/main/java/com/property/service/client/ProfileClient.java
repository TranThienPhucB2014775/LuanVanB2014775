package com.property.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.property.dto.ApiResponse;
import com.property.dto.response.ProfileResponse;

@FeignClient(name = "profile-service")
public interface ProfileClient {

    @GetMapping(value = "/profile/{userId}", consumes = "application/json")
    ApiResponse<ProfileResponse> getProfileByUserId(@PathVariable String userId);
}
