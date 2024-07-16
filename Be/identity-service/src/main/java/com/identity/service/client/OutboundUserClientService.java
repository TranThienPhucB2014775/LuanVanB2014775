package com.identity.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.identity.dto.Response.OutBoundUserResponse;

@FeignClient(name = "outbound-user", url = "https://www.googleapis.com")
public interface OutboundUserClientService {
    @GetMapping(value = "/oauth2/v1/userinfo")
    OutBoundUserResponse getUserInfo(@RequestParam("alt") String alt, @RequestParam("access_token") String accessToken);
}
