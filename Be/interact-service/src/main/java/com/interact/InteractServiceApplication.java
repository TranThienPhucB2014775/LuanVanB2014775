package com.interact;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableMethodSecurity(prePostEnabled = true)
@EnableFeignClients
public class InteractServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(InteractServiceApplication.class, args);
    }
}
