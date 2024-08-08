package com.property.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class roomTypeCreationRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String apartmentId;

    @NotNull(message = "INVALID_VALUE")
    String name;

    @NotNull(message = "INVALID_VALUE")
    String description;

    @NotNull(message = "INVALID_VALUE")
    String info;

    @NotNull(message = "INVALID_VALUE")
    String utility;

}
