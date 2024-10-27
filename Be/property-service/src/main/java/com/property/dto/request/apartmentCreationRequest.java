package com.property.dto.request;

import static com.property.constant.ApartmentTypes.*;

import jakarta.validation.constraints.NotNull;

import com.property.validation.ApartmentTypeSubset;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApartmentCreationRequest {

    @NotNull(message = "INVALID_VALUE")
    String name;

    @NotNull(message = "INVALID_VALUE")
    String city;

    @NotNull(message = "INVALID_VALUE")
    String address;

    String rule;

    String utility;

    String description;

    @NotNull
    @ApartmentTypeSubset(anyOf = {APARTMENT, HOUSE, STUDIO, DORMITORY, ROOM})
    String apartmentType;
}
