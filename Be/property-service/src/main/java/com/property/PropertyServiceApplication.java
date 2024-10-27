package com.property;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableMethodSecurity(prePostEnabled = true)
@EnableFeignClients
@EnableScheduling
public class PropertyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyServiceApplication.class, args);
    }
}
