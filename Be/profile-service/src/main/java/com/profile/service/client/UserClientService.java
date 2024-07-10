package com.profile.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.profile.dto.ApiResponse;
import com.profile.dto.Response.UserResponse;

@FeignClient(name = "identity-service")
public interface UserClientService {
    @GetMapping(value = "/users/{email}", consumes = "application/json")
    ApiResponse<UserResponse> getUserInfo(@PathVariable String email, @RequestHeader String Authorization);
}
