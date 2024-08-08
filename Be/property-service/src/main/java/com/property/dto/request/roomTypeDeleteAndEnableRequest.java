package com.property.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class roomTypeDeleteAndEnableRequest {
    @NotNull
    String roomTypeId;
}
