package com.interact.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNAUTHENTICATED(-1, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(9998, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_KEY(-2, "Invalid key", HttpStatus.BAD_REQUEST),
    ITEM_ID_INCORRECT(1, "Item id is incorrect", HttpStatus.BAD_REQUEST),
    RATING_INCORRECT(2, "Rating is incorrect", HttpStatus.BAD_REQUEST),
    USER_ID_INCORRECT(3, "User id is incorrect", HttpStatus.BAD_REQUEST),
    FEEDBACK_INCORRECT(4, "Feedback min 20 characters", HttpStatus.BAD_REQUEST),
    FEED_BACK_NOT_FOUND(5, "Feed back not found", HttpStatus.NOT_FOUND),
    FEED_BACK_ALREADY_UPDATED(6, "Feed back already updated", HttpStatus.BAD_REQUEST),
    PROFILE_NOT_FOUND(7, "Profile not found", HttpStatus.NOT_FOUND),
    FEED_BACK_ALREADY_EXISTS(8, "Feed back already exists", HttpStatus.BAD_REQUEST),
    FEED_BACK_NOT_ALLOWED(9, "Feed back not allowed", HttpStatus.BAD_REQUEST),
    ITEM_ID_EMPTY(10, "Item id is empty", HttpStatus.BAD_REQUEST),
    INVALID_VALUE(11, "Invalid value", HttpStatus.BAD_REQUEST),
    REPORT_TYPE_NOT_VALID(12, "Report type not valid", HttpStatus.BAD_REQUEST),
    REPORT_NOT_FOUND(13, "Report not found", HttpStatus.NOT_FOUND),
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
