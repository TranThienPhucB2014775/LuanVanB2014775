package com.identity.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.UserCreateRequest;
import com.identity.dto.Response.UserResponse;
import com.identity.exception.AppException;
import com.identity.exception.ErrorCode;
import com.identity.service.UserService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserController {

    UserService userService;

    @PostMapping("/registration")
    ResponseEntity<ApiResponse<UserResponse>> createUser(@RequestBody @Valid UserCreateRequest request) {

        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<UserResponse>builder()
                        .result(userService.createUser(request))
                        .build());
    }

    @GetMapping("/list-user")
    ApiResponse<List<UserResponse>> getAllUser(@RequestHeader(value = "Authorization") String token) {
        return ApiResponse.<List<UserResponse>>builder()
                .result(userService.getAllUser(token))
                .build();
    }

    @GetMapping
    ApiResponse<UserResponse> getUser(
            @RequestHeader(value = "Authorization", defaultValue = "") String token
    ) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(token.replace("Bearer ", "")))
                .build();
    }

    @DeleteMapping("/{userEmail}")
    public ApiResponse<String> deleteUser(@PathVariable String userEmail) {
        log.info("Delete user with email {}", userEmail);
        userService.deleteUser(userEmail);
        return ApiResponse.<String>builder().result("User has been deleted").build();
    }

    @PutMapping("/{userEmail}")
    public ApiResponse<String> updateUser(@PathVariable String userEmail) {
        log.info("Update user with email {}", userEmail);
        userService.enableUser(userEmail);
        return ApiResponse.<String>builder().result("User has been updated").build();
    }
}
