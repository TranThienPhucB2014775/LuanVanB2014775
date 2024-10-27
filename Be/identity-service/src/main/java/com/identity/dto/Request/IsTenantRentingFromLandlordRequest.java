package com.identity.dto.Request;

import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class IsTenantRentingFromLandlordRequest {

    String tenantId;

    String landlordId;
}
