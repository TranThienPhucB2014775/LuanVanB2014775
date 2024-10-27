package com.property.service.client;

import com.property.dto.ApiResponse;
import com.property.dto.response.ProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "profile-service")
public interface ProfileClient {

    @GetMapping(value = "/profile/{userId}", consumes = "application/json")
    ApiResponse<ProfileResponse> getProfileByUserId(@PathVariable String userId);
}
