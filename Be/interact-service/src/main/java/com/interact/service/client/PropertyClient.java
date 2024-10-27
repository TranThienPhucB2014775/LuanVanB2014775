package com.interact.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.interact.dto.ApiResponse;
import com.interact.dto.response.ApartmentResponse;

@FeignClient(name = "property-service")
public interface PropertyClient {

    @GetMapping(value = "/apartment/{apartmentId}", consumes = "application/json")
    ApiResponse<ApartmentResponse> getApartmentByApartmentId(@PathVariable String apartmentId);
}
