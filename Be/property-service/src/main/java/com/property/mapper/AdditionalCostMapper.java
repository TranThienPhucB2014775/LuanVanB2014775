package com.property.mapper;

import com.property.dto.request.AdditionalCostCreationRequest;
import com.property.dto.request.AdditionalCostUpdateRequest;
import com.property.dto.response.AdditionalCostResponse;
import com.property.entity.AdditionalCost;

public class AdditionalCostMapper {

    public static AdditionalCost additionalCostCreationRequestToAdditionalCost(AdditionalCostCreationRequest request) {
        return AdditionalCost.builder()
                .cost(request.getCost())
                .name(request.getName())
                .unit(request.getUnit())
                .isAvailable(true)
                .build();
    }

    public static AdditionalCost additionalCostUpdateRequestToAdditionalCost(AdditionalCostUpdateRequest request) {
        return AdditionalCost.builder()
                .cost(request.getCost())
                .name(request.getName())
                .unit(request.getUnit())
                .build();
    }

    public static AdditionalCostResponse additionalCostToAdditionalCostResponse(AdditionalCost additionalCost) {
        return AdditionalCostResponse.builder()
                .cost(additionalCost.getCost())
                .name(additionalCost.getName())
                .AdditionalCostType(additionalCost.getAdditionalCostType().getName())
                .unit(additionalCost.getUnit())
                .additionalCostId(additionalCost.getAdditionalCostId())
                .build();
    }
}
