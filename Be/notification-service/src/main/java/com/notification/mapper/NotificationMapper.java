package com.notification.mapper;

import com.notification.dto.response.NotificationResponse;
import com.notification.entity.Notification;

public class NotificationMapper {

    public static NotificationResponse mapToNotificationResponse(Notification notification) {
        return NotificationResponse.builder()
                .title(notification.getTitle())
                .message(notification.getMessage())
                .userId(notification.getUserId())
                .isRead(notification.getIsRead())
                .id(notification.getId())
                .createdAt(notification.getCreatedAt())
                .build();
    }

}
