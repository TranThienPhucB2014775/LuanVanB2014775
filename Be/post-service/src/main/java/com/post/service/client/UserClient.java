package com.post.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

import com.post.dto.ApiResponse;
import com.post.dto.response.UserResponse;

@FeignClient(name = "identity-service")
public interface UserClient {

    @GetMapping(value = "/users/userId/{userId}", consumes = "application/json")
    ApiResponse<UserResponse> getUserByUserId(@PathVariable String userId);

    @GetMapping(value = "/users/email/{email}", consumes = "application/json")
    ApiResponse<UserResponse> getUserByEmail(@PathVariable String email, @RequestHeader("Authorization") String token);
}
