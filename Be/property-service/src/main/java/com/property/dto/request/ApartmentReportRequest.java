package com.property.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class ApartmentReportRequest {
    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    @NotBlank(message = "INVALID_VALUE")
    String apartmentId;

    @NotBlank(message = "INVALID_VALUE")
    String message;
}
