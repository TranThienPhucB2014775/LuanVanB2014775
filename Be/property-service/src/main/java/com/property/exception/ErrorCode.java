package com.property.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.Getter;

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
    RENT_STATUS_INVALID(7, "Rent status is invalid", HttpStatus.BAD_REQUEST),
    ROOM_NOT_FOUND(8, "Room not found", HttpStatus.NOT_FOUND),
    ADDITIONAL_COST_NOT_FOUND(9, "Additional cost not found", HttpStatus.NOT_FOUND),
    EMAIL_INCORRECT_FORMAT(10, "Email must be in the correct format", HttpStatus.BAD_REQUEST),
    EMAIL_AND_USER_ID_NULL(11, "Email and user id cannot be null at the same time", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(12, "User not found", HttpStatus.NOT_FOUND),
    INVITATION_NOT_FOUND(13, "Invitation not found", HttpStatus.NOT_FOUND),
    INVALID_INVITATION_TOKEN(14, "Invalid invitation token", HttpStatus.BAD_REQUEST),
    INVITATION_NOT_PENDING(15, "Invitation is not pending", HttpStatus.BAD_REQUEST),
    ROOM_FULL(16, "Room is full", HttpStatus.BAD_REQUEST),
    INVALID_ADDITIONAL_COST_TYPE(17, "Invalid additional cost type", HttpStatus.BAD_REQUEST),
    ADDITIONAL_COST_TYPE_NOT_FOUND(18, "Additional cost type not found", HttpStatus.NOT_FOUND),
    MONTHLY_USAGE_ALREADY_EXISTS(19, "Monthly usage already exists", HttpStatus.BAD_REQUEST),
    INVOICE_NOT_FOUND(20, "Invoice not found", HttpStatus.BAD_REQUEST),
    ROOM_NOT_AVAILABLE_IN_CONTRACT(21, "Room not available in contract", HttpStatus.BAD_REQUEST),
    CONTRACT_ALREADY_EXISTS(22, "Contract already exists", HttpStatus.BAD_REQUEST),
    CONTRACT_NOT_FOUND(23, "Contract not found", HttpStatus.NOT_FOUND),
    TENANT_NOT_FOUND(24, "Tenant not found", HttpStatus.NOT_FOUND),
    INVOICE_COMPLETED(25, "Invoice completed", HttpStatus.BAD_REQUEST),
    INVALID_ADDITIONAL_COST_TYPE_FOR_ROOM(26, "Invalid additional cost type for room", HttpStatus.BAD_REQUEST),
    REPORT_ISSUE_NOT_FOUND(27, "Report issue not found", HttpStatus.NOT_FOUND),
    INVALID_REPORT_ISSUE_TYPE(28, "Invalid report issue type", HttpStatus.BAD_REQUEST),
    MAX_UPLOAD_SIZE_EXCEEDED(29, "Max upload size exceeded", HttpStatus.BAD_REQUEST),
    USER_NOT_VERIFIED(19, "User not verified", HttpStatus.BAD_REQUEST),
    LANDLORD_NOT_VERIFIED(20, "Landlord not verified", HttpStatus.BAD_REQUEST),
    ROOM_TYPE_AVAILABLE(21, "Room type available", HttpStatus.BAD_REQUEST),
    ROOM_AVAILABLE(22, "Room available", HttpStatus.BAD_REQUEST),
    CONTRACT_AVAILABLE(23, "Contract available", HttpStatus.BAD_REQUEST),
    ROOM_HAS_CONTRACT(24, "Room has contract", HttpStatus.BAD_REQUEST),
    ROOM_TYPE_NOT_AVAILABLE(25, "Room type not available", HttpStatus.BAD_REQUEST),
    ROOM_NOT_AVAILABLE(26, "Room not available", HttpStatus.BAD_REQUEST),
    APARTMENT_NOT_AVAILABLE(27, "Apartment not available", HttpStatus.BAD_REQUEST),
    FUTURE_INVOICE_EXISTS(28, "Future invoice exists", HttpStatus.BAD_REQUEST),
    MISSING_REQUIRED_ID(29, "Missing required id", HttpStatus.BAD_REQUEST),
    INVALID_REQUEST(30, "Invalid request", HttpStatus.BAD_REQUEST),
    INVALID_USAGE(31, "Invalid usage", HttpStatus.BAD_REQUEST),
    CONTRACT_NOT_AVAILABLE(32, "Contract not available", HttpStatus.BAD_REQUEST),
    CAN_NOT_MOVE_TO_ANOTHER_ROOM_TYPE(33, "Can not move to another room type", HttpStatus.BAD_REQUEST),
    ROOM_RENTED(34, "Room rented", HttpStatus.BAD_REQUEST),
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
