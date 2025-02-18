package com.identity.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.CreateNotificationToTenant;
import com.identity.dto.Request.IsTenantRentingFromLandlordRequest;

@FeignClient(name = "property-service")
public interface PropertyClientService {

    @PostMapping(value = "/tenants/is-renting", consumes = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<Boolean> isTenantRentingFromLandlord(
            @RequestBody IsTenantRentingFromLandlordRequest request,
            @RequestHeader("Authorization") String authorization);

    @PostMapping(value = "/tenants/notification/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<String> pushNotification(
            @RequestBody CreateNotificationToTenant request,
            @RequestHeader("Authorization") String authorization,
            @PathVariable("userId") String userId);
}
