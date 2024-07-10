package com.gateway.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.gateway.dto.ApiResponse;
import com.gateway.dto.request.IntrospectRequest;
import com.gateway.dto.response.IntrospectResponse;

import reactor.core.publisher.Mono;

@FeignClient(name = "profile-service")
public interface ProfileFeignClient {
    @PostMapping("/api/v1/auth/introspect")
    public Mono<ApiResponse<IntrospectResponse>> introspect(@RequestBody IntrospectRequest request);
}
