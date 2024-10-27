package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
@Builder
public class ApartmentResponse {
    String apartmentId;
    String userId;

    String name;
    String city;
    String address;
    String rule;
    String utility;
    String description;
    Boolean isAvailable;
    String apartmentType;
    Set<AdditionalCostResponse> additionalCostResponses;
}
