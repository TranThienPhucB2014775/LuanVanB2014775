package com.notification.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.notification.dto.ApiResponse;
import com.notification.dto.response.ListResponse;
import com.notification.dto.response.NotificationResponse;
import com.notification.service.NotificationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/notifications")
public class NotificationController {

    NotificationService notificationService;

    @GetMapping("/{pageNum}")
    public ApiResponse<ListResponse<NotificationResponse>> getAllNotifications(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(required = false) Boolean isRead) {
        return ApiResponse.<ListResponse<NotificationResponse>>builder()
                .result(notificationService.getNotifications(pageNum, pageSize, isRead))
                .build();
    }

    @GetMapping("/un-read")
    public ApiResponse<Long> getUnReadNotifications() {
        return ApiResponse.<Long>builder()
                .result(notificationService.getUnReadNotifications())
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotification(@PathVariable String id) {
        notificationService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }
}
