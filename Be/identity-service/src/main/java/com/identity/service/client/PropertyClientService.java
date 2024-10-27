package com.identity.service.client;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.IsTenantRentingFromLandlordRequest;
import com.identity.dto.Request.ProfileCreationRequest;
import com.identity.dto.Response.ProfileCreationResponse;
import com.identity.dto.Response.ProfileResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@FeignClient(name = "property-service")
public interface PropertyClientService {

    @PostMapping(value = "/tenants//is-renting", consumes = MediaType.APPLICATION_JSON_VALUE)
    ApiResponse<Boolean> isTenantRentingFromLandlord(
            @RequestBody IsTenantRentingFromLandlordRequest request,
            @RequestHeader("Authorization") String authorization
    );

}
