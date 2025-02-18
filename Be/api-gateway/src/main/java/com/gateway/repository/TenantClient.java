package com.gateway.repository;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PostExchange;

import com.gateway.dto.ApiResponse;
import com.gateway.dto.request.IsTenantRentingFromLandlordRequest;

import reactor.core.publisher.Mono;

public interface TenantClient {
    @PostExchange(url = "lb://PROPERTY-SERVICE/tenants/is-renting", contentType = MediaType.APPLICATION_JSON_VALUE)
    Mono<ApiResponse<Boolean>> isTenantRentingFromLandlord(@RequestBody IsTenantRentingFromLandlordRequest request);
}
