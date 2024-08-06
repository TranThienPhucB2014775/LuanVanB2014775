package com.identity.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.UserCreateRequest;
import com.identity.dto.Response.AllUserResponse;
import com.identity.dto.Response.ListResponse;
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

    KafkaTemplate<String, Object> kafkaTemplate;
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

    //    @GetMapping
    //    ApiResponse<List<UserResponse>> getAllUser(@RequestHeader(value = "Authorization") String token) {
    //        return ApiResponse.<List<UserResponse>>builder()
    //                .result(userService.getAllUser(token))
    //                .build();
    //    }
    @GetMapping("/all/{pageNum}")
    ApiResponse<ListResponse<AllUserResponse>> getAllUser(
            @RequestHeader(value = "Authorization") String token,
            @PathVariable String pageNum,
            @RequestParam(defaultValue = "10", required = false) String pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) Boolean isEnable) {
        return ApiResponse.<ListResponse<AllUserResponse>>builder()
                .result(userService.getAllUser(
                        Integer.parseInt(pageNum), Integer.parseInt(pageSize), sortBy, order, search, isEnable))
                .build();
    }

    @GetMapping("/me")
    ApiResponse<UserResponse> getUser(@RequestHeader(value = "Authorization", defaultValue = "") String token) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUser(token.replace("Bearer ", "")))
                .build();
    }

    @GetMapping("/{id}")
    ApiResponse<UserResponse> getUserByEmail(
            @PathVariable String id, @RequestHeader(value = "Authorization", defaultValue = "") String token) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getUserByEmail(id, token.replace("Bearer ", "")))
                .build();
    }

    @DeleteMapping("/{userEmail}")
    public ApiResponse<String> deleteUser(@PathVariable String userEmail) {
        log.info("Delete user with email {}", userEmail);
        userService.deleteUser(userEmail);
        return ApiResponse.<String>builder().result(userEmail).build();
    }

    @PutMapping("/{userEmail}")
    public ApiResponse<String> updateUser(@PathVariable String userEmail) {
        log.info("Update user with email {}", userEmail);
        userService.enableUser(userEmail);
        return ApiResponse.<String>builder().result(userEmail).build();
    }
}
