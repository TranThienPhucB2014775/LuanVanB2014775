package com.landlord.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class LandlordManagementServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(LandlordManagementServiceApplication.class, args);
    }

}
