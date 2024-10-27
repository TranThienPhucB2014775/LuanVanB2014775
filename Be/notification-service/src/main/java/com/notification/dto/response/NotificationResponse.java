package com.notification.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class NotificationResponse {

    String userId;
    String title;
    String message;
    Boolean isRead;
    String id;
    Instant createdAt;
}
