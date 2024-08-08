package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@Builder
public class ApartmentResponse {
    String apartmentId;

    String city;
    String address;
    String rule;
    String utility;
    String description;
    Boolean isAvailable;
    String apartmentType;

}
