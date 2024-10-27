package com.identity.config;

import feign.FeignException;
import feign.Response;
import feign.codec.Encoder;
import feign.codec.ErrorDecoder;
import feign.form.spring.SpringFormEncoder;
import org.apache.http.annotation.Contract;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class FeignClientConfiguration {

    @Bean
    public ErrorDecoder errorDecoder() {
        return new ErrorDecoder.Default() {
            @Override
            public Exception decode(String methodKey, Response response) {
                if (response.body() == null) {
                    return new FeignException.FeignClientException(
                            response.status(), "Empty response body", response.request(), null, null);
                }
                return super.decode(methodKey, response);
            }
        };
    }

}
