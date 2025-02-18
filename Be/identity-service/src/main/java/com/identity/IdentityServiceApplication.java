package com.identity;

import com.identity.dto.Request.ProfileCreationRequest;
import com.identity.entity.Role;
import com.identity.entity.User;
import com.identity.repository.RoleRepository;
import com.identity.repository.UserRepository;
import com.identity.service.client.ProfileClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

@SpringBootApplication
@EnableFeignClients
@EnableJpaAuditing
@EnableMethodSecurity(prePostEnabled = true)
public class IdentityServiceApplication {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public static void main(String[] args) {
        SpringApplication.run(IdentityServiceApplication.class, args);
    }

//    @Bean
//    CommandLineRunner initRoles(RoleRepository roleRepository) {
//        return args -> {
//            List<Role> roles = Arrays.asList(
//                    new Role("LANDLORD", "LANDLORD", null),
//                    new Role("TENANT", "TENANT", null),
//                    new Role("ADMIN", "Administrator role", null)
//            );
//
//            for (Role role : roles) {
//                roleRepository.findById(role.getName()).orElseGet(() -> roleRepository.save(role));
//            }
//        };
//    }

    @Bean
    CommandLineRunner initAdminUser(
            UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
            ProfileClientService profileClientService
    ) {
        return args -> {

            List<Role> roles = Arrays.asList(
                    new Role("LANDLORD", "LANDLORD", null),
                    new Role("TENANT", "TENANT", null),
                    new Role("ADMIN", "Administrator role", null)
            );

            for (Role role : roles) {
                roleRepository.findById(role.getName()).orElseGet(() -> roleRepository.save(role));
            }

            String adminEmail = "admin@admin.com";
            String adminPassword = "stringstring";

            if (!userRepository.findByEmail(adminEmail).isPresent()) {
                Role adminRole = roleRepository.findById("ADMIN").orElseThrow(() -> new RuntimeException("Admin role not found"));
                User adminUser = new User();
                adminUser.setEmail(adminEmail);
                adminUser.setPassword(passwordEncoder.encode(adminPassword));
                adminUser.setRoles(Set.of(adminRole));
                adminUser.setEnabled(true);
                userRepository.save(adminUser);

                ProfileCreationRequest profileCreationRequest = ProfileCreationRequest.builder()
                        .userId(adminUser.getId())
                        .city("")
                        .address("")
                        .city("")
                        .build();
                profileClientService.createProfile(profileCreationRequest);

            }
        };
    }

    @Bean
    CommandLineRunner createUnaccentExtension() {
        return args -> {
            jdbcTemplate.execute("CREATE EXTENSION IF NOT EXISTS unaccent");
        };
    }
}
