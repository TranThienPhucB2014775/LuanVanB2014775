package com.gateway.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Builder
@Getter
public class IsTenantRentingFromLandlordRequest {

    String tenantId;
    String landlordId;
}
