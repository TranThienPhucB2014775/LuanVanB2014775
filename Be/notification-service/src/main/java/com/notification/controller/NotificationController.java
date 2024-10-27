package com.notification.controller;

import com.event.dto.CreateNotificationEvent;
import com.notification.dto.ApiResponse;
import com.notification.dto.response.ListResponse;
import com.notification.dto.response.NotificationResponse;
import com.notification.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.event.dto.NotificationEvent;
import com.notification.dto.request.Recipient;
import com.notification.dto.request.SendEmailRequest;
import com.notification.service.EmailService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam(required = false) Boolean isRead

    ) {
        return ApiResponse.<ListResponse<NotificationResponse>>builder()
                .result(notificationService.getNotifications(pageNum, pageSize, isRead))
                .build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNotification(
            @PathVariable String id
    ) {
        notificationService.markAsRead(id);
        return ResponseEntity.noContent().build();
    }

}
