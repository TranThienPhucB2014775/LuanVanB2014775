package com.gateway;

import com.gateway.constant.ServiceDetail;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EnableFeignClients
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator routeLocator(RouteLocatorBuilder routeLocatorBuilder) {

        List<ServiceDetail> serviceDetails = List.of(
                new ServiceDetail("identity","IDENTITY-SERVICE"),
                new ServiceDetail("profile","PROFILE-SERVICE"),
                new ServiceDetail("media","MEDIA-SERVICE"),
                new ServiceDetail("notification","NOTIFICATION-SERVICE"),
                new ServiceDetail("post","POST-SERVICE"),
                new ServiceDetail("content","CONTENT-SERVICE"),
                new ServiceDetail("property","PROPERTY-SERVICE")
        );

        RouteLocatorBuilder.Builder builder = routeLocatorBuilder.routes();

        for (ServiceDetail service : serviceDetails) {
            builder.route(p -> p.path("/api/v1/"+service.getPath() + "/**")
                    .filters(f -> f.rewritePath("/api/v1/" + service.getPath() + "/(?<segment>.*)", "/${segment}"))
                    .uri("lb://" + service.getServiceName()));
        }

        return builder.build();

//        return routeLocatorBuilder
//
//
//                .routes()
//                .route(p -> p.path("/api/v1/identity/**")
//                        .filters(f -> f.rewritePath("/api/v1/identity/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://IDENTITY-SERVICE"))
//                .route(p -> p.path("/api/v1/profile/**")
//                        .filters(f -> f.rewritePath("/api/v1/profile/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://PROFILE-SERVICE"))
//                .route(p -> p.path("/api/v1/media/**")
//                        .filters(f -> f.rewritePath("/api/v1/media/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://MEDIA-SERVICE"))
//                .route(p -> p.path("/api/v1/notification/**")
//                        .filters(f -> f.rewritePath("/api/v1/notification/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://NOTIFICATION-SERVICE"))
//                .route(p -> p.path("/api/v1/post/**")
//                        .filters(f -> f.rewritePath("/api/v1/post/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://POST-SERVICE"))
//                .route(p -> p.path("/api/v1/content/**")
//                        .filters(f -> f.rewritePath("/api/v1/content/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://CONTENT-SERVICE"))
//                .route(p -> p.path("/api/v1/property/**")
//                        .filters(f -> f.rewritePath("/api/v1/property/(?<segment>.*)", "/${segment}"))
//                        .uri("lb://PROPERTY-SERVICE"))
//                .build();
    }
}
