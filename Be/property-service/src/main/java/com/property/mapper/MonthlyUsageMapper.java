package com.property.mapper;

import com.property.dto.response.MonthlyUsageCreationResponse;
import com.property.dto.response.MonthlyUsageResponse;
import com.property.entity.MonthlyUsage;

public class MonthlyUsageMapper {

    public static MonthlyUsageCreationResponse toMonthlyUsageCreationResponse(MonthlyUsage monthlyUsage) {
        return MonthlyUsageCreationResponse.builder()
                .month(monthlyUsage.getMonth())
                .year(monthlyUsage.getYear())
                .additionalCostId(monthlyUsage.getAdditionalCost().getAdditionalCostId())
                .cost(monthlyUsage.getCost())
                .usage(monthlyUsage.getUsage())
                .additionalCostResponse(AdditionalCostMapper.additionalCostToAdditionalCostResponse(monthlyUsage.getAdditionalCost()))
                .build();
    }
}
