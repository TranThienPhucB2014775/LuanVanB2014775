package com.property.dto.request;

import static com.property.constant.RentStatus.*;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.Getter;

@Getter
public class RoomCreationRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String roomTypeId;

    @NotNull(message = "INVALID_VALUE")
    List<String> name;
}
