package com.property.dto.request;

import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApartmentDeleteAndEnableRequest {
    @NotNull
    String apartmentId;
}
