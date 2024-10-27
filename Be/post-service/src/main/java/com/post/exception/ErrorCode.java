package com.post.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNAUTHENTICATED(-1, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(9998, "You do not have permission", HttpStatus.FORBIDDEN),
    FILE_SIZE_LIMIT_EXCEEDED(9997, "File size limit exceeded", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1, "Invalid key", HttpStatus.BAD_REQUEST),
    CANNOT_SEND_EMAIL(2, "Cannot send email", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_VALUE(3, "Invalid value", HttpStatus.BAD_REQUEST),
    UUID_INCORRECT_FORMAT(4, "UUID must be in the correct format", HttpStatus.BAD_REQUEST),
    RENTAL_POST_NOT_FOUND(5, "Rental post not found", HttpStatus.NOT_FOUND),
    IMAGE_NOT_FOUND(6, "Image not found", HttpStatus.NOT_FOUND),
    COMMENT_NOT_FOUND(7, "Comment not found", HttpStatus.NOT_FOUND),
    INVALID_RENTAL_POST_TYPE(8, "Invalid rental post type", HttpStatus.BAD_REQUEST),
    TENANT_POST_NOT_FOUND(9, "Tenant post not found", HttpStatus.NOT_FOUND),

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
