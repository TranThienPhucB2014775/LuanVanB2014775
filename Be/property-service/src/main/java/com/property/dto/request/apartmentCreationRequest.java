package com.property.dto.request;

import com.property.validation.ApartmentTypeSubset;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import static com.property.constant.ApartmentTypes.*;

@Getter
@Setter
public class apartmentCreationRequest {

    @NotNull(message = "INVALID_VALUE")
    String city;

    @NotNull(message = "INVALID_VALUE")
    String address;

    String rule;

    String utility;

    String description;

    @NotNull
    @ApartmentTypeSubset(
            anyOf = {APARTMENT, HOUSE, STUDIO, DORMITORY, ROOM})
    String apartmentType;
}
