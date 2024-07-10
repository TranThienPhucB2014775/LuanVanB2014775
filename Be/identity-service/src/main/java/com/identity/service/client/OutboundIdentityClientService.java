package com.identity.service.client;

import com.identity.dto.Request.ExchangeTokenRequest;
import com.identity.dto.Response.ExchangeTokenResponse;
import feign.QueryMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "outbound-identity", url = "https://oauth2.googleapis.com")
public interface OutboundIdentityClientService {
    @PostMapping(value = "/token", produces = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ExchangeTokenResponse exchangeToken(@QueryMap ExchangeTokenRequest request);
}
