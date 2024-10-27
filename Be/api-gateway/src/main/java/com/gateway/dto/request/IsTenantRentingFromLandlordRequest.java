package com.gateway.dto.request;

import jakarta.validation.constraints.Pattern;
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
