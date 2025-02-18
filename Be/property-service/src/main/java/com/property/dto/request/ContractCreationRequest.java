package com.property.dto.request;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.validation.constraints.NotNull;

import lombok.Getter;

@Getter
public class ContractCreationRequest {
    @NotNull(message = "INVALID_VALUE")
    String roomId;

    @NotNull(message = "INVALID_VALUE")
    String landlordId;

    @NotNull(message = "INVALID_VALUE")
    String description;

    @NotNull(message = "INVALID_VALUE")
    Instant startDate;

    @NotNull(message = "INVALID_VALUE")
    Instant expectedEndDate;

    @NotNull(message = "INVALID_VALUE")
    BigDecimal price;

    @NotNull(message = "INVALID_VALUE")
    BigDecimal depositAmount;
}
