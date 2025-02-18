package com.gateway;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import com.gateway.constant.ServiceDetail;

@SpringBootApplication
@EnableFeignClients
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder) {

        List<ServiceDetail> serviceDetails = List.of(
                new ServiceDetail("identity", "IDENTITY-SERVICE"),
                new ServiceDetail("profile", "PROFILE-SERVICE"),
                new ServiceDetail("media", "MEDIA-SERVICE"),
                new ServiceDetail("notification", "NOTIFICATION-SERVICE"),
                new ServiceDetail("post", "POST-SERVICE"),
                new ServiceDetail("content", "CONTENT-SERVICE"),
                new ServiceDetail("property", "PROPERTY-SERVICE"),
                new ServiceDetail("interact", "INTERACT-SERVICE"),
                new ServiceDetail("notification", "NOTIFICATION-SERVICE"),
                new ServiceDetail("post", "POST-SERVICE"));

        RouteLocatorBuilder.Builder builder = routeLocatorBuilder.routes();

        for (ServiceDetail service : serviceDetails) {
            builder.route(p -> p.path("/api/v1/" + service.getPath() + "/**")
                    .filters(f -> f.rewritePath("/api/v1/" + service.getPath() + "/(?<segment>.*)", "/${segment}"))
                    .uri("lb://" + service.getServiceName()));
        }

        return builder.build();
    }
}
