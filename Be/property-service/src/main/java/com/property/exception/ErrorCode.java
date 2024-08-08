package com.property.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNAUTHENTICATED(-1, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHORIZED(9998, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_KEY(1000, "Invalid key", HttpStatus.BAD_REQUEST),
    INVALID_VALUE(1, "Invalid value", HttpStatus.BAD_REQUEST),
    INVALID_APARTMENT_TYPE(2, "Invalid apartment type", HttpStatus.BAD_REQUEST),
    APARTMENT_TYPE_EXISTED(3, "Apartment type existed", HttpStatus.BAD_REQUEST),
    APARTMENT_NOT_FOUND(4, "Apartment not found", HttpStatus.NOT_FOUND),
    UUID_INCORRECT_FORMAT(5, "UUID must be in the correct format", HttpStatus.BAD_REQUEST),
    ROOM_TYPE_NOT_FOUND(6, "Room type not found", HttpStatus.NOT_FOUND),
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
