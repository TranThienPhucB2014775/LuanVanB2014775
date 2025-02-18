package com.property.dto.request;

import static com.property.constant.RentStatus.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.Getter;

@Getter
public class RoomUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String roomId;

    @NotNull(message = "INVALID_VALUE")
    String name;
}
