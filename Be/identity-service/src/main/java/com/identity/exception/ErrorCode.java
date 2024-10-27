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
    ROLE_INVALID(3, "Role Invalid", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(4, "Password must be at least {min} characters", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_NOT_EXISTED(5, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(6, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(7, "You do not have permission", HttpStatus.FORBIDDEN),
    EMAIL_EXIST(8, "Email has been existed", HttpStatus.FORBIDDEN),
    PASSWORD_NOT_MATCH(9, "Your password and confirmpassword must same", HttpStatus.UNPROCESSABLE_ENTITY),
    USER_LOCKED(100, "You account has been lock!", HttpStatus.UNAUTHORIZED),
    CANNOT_DELETE_ADMIN(10, "You cannot delete admin user", HttpStatus.BAD_REQUEST),
    MEDIA_SERVICE_ERROR(11, "Media service error", HttpStatus.BAD_REQUEST),
    PROFILE_SERVICE_ERROR(12, "Profile service error", HttpStatus.BAD_REQUEST),
    CARD_ID_INVALID(13, "Card ID Invalid", HttpStatus.BAD_REQUEST),
    INVALID_VALUE(14, "Invalid value", HttpStatus.BAD_REQUEST),
    USER_VERIFICATION_REQUEST_NOT_FOUND(15, "User verification request not found", HttpStatus.NOT_FOUND),
    USER_VERIFICATION_REQUEST_ALREADY_CHECKED(16, "User verification request already checked", HttpStatus.BAD_REQUEST),
    IMAGE_CARD_ID_NOT_FOUND(17, "Image card ID not found", HttpStatus.NOT_FOUND),
    USER_VERIFICATION_NOT_FOUND(18, "User verification not found", HttpStatus.NOT_FOUND),
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
