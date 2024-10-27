package com.notification.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNAUTHENTICATED(-1, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(9998, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_KEY(1, "Invalid key", HttpStatus.BAD_REQUEST),
    CANNOT_SEND_EMAIL(2, "Cannot send email", HttpStatus.INTERNAL_SERVER_ERROR),
    NOTIFICATION_NOT_FOUND(3, "Notification not found", HttpStatus.NOT_FOUND),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
