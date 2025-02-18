package com.gateway.service;

import org.springframework.stereotype.Service;

import com.gateway.dto.ApiResponse;
import com.gateway.dto.request.IsTenantRentingFromLandlordRequest;
import com.gateway.repository.TenantClient;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TenantService {

    TenantClient tenantClient;

    public Mono<ApiResponse<Boolean>> isTenantRentingFromLandlord(String tenantId, String landlordId) {
        return tenantClient.isTenantRentingFromLandlord(IsTenantRentingFromLandlordRequest.builder()
                .tenantId(tenantId)
                .landlordId(landlordId)
                .build());
    }
}
