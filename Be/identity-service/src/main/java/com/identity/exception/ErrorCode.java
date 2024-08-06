package com.identity.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNKNOWN_ERROR(-1, "Unknown error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    AUTHORIZATION_DENIED(9998, "Authorization denied", HttpStatus.FORBIDDEN),
    INVALID_KEY(1, "Uncategorized error", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(2, "Email Invalid", HttpStatus.BAD_REQUEST),
    ROLE_INVALID(3, "Username must be at least {min} characters", HttpStatus.UNPROCESSABLE_ENTITY),
    INVALID_PASSWORD(4, "Password must be at least {min} characters", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_NOT_EXISTED(5, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(6, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(7, "You do not have permission", HttpStatus.FORBIDDEN),
    EMAIL_EXIST(8, "Email has been existed", HttpStatus.FORBIDDEN),
    PASSWORD_NOT_MATCH(9, "Your password and confirmpassword must same", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_LOCKED(100, "You account has been lock!", HttpStatus.UNAUTHORIZED),
    CANNOT_DELETE_ADMIN(10, "You cannot delete admin user", HttpStatus.BAD_REQUEST),
    MEDIA_SERVICE_ERROR(11, "Media service error", HttpStatus.BAD_REQUEST),
    PROFILE_SERVICE_ERROR(12, "Profile service error", HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;
}
