package com.notification.dto.response;

import java.time.Instant;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
