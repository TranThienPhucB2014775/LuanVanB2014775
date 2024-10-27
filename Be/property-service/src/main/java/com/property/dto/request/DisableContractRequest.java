package com.property.dto.request;

import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class DisableContractRequest {
    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    private String contractId;
}
