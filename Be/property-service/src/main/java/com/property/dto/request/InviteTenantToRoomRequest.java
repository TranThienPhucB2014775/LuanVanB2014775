package com.property.dto.request;

import com.property.validation.ValidUserIdOrEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@ValidUserIdOrEmail
public class InviteTenantToRoomRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String userId;

    @Email(message = "EMAIL_INCORRECT_FORMAT")
    String email;

    @NotNull(message = "INVALID_VALUE")
    String roomId;

    @NotNull(message = "INVALID_VALUE")
    String message;

    @NotNull(message = "INVALID_VALUE")
    Instant startDate;

    @NotNull(message = "INVALID_VALUE")
    Instant endDate;

    @NotNull(message = "INVALID_VALUE")
    BigDecimal price;

    @NotNull(message = "INVALID_VALUE")
    BigDecimal depositAmount;
}
