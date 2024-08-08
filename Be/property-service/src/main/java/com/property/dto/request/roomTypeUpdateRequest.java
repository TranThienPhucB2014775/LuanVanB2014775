package com.property.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class roomTypeUpdateRequest {
//    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String apartmentId;

//    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String roomTypeId;

    @NotNull(message = "INVALID_VALUE")
    String name;

    @NotNull(message = "INVALID_VALUE")
    String description;

    @NotNull(message = "INVALID_VALUE")
    String info;

    @NotNull(message = "INVALID_VALUE")
    String utility;
}
