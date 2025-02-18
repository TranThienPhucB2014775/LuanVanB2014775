package com.property.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@AllArgsConstructor
public class TenantResponse {
    String userId;

    String rentalDuration;

    String startDate;
    String endDate;
    Boolean isAvailable;

}
