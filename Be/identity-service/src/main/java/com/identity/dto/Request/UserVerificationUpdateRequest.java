package com.identity.dto.Request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.*;

@Getter
public class UserVerificationUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String id;

    @NotNull(message = "INVALID_VALUE")
    String message;

    @NotNull(message = "INVALID_VALUE")
    Boolean isSuccessful;
}
