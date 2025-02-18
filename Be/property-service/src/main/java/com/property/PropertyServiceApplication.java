package com.property;

import com.property.entity.AdditionalCostType;
import com.property.entity.ApartmentType;
import com.property.repository.AdditionalCostTypeRepository;
import com.property.repository.ApartmentTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
@EnableMethodSecurity(prePostEnabled = true)
@EnableFeignClients
@EnableScheduling
public class PropertyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(PropertyServiceApplication.class, args);
    }

    @Bean
    public CommandLineRunner loadData(ApartmentTypeRepository apartmentTypeRepository, AdditionalCostTypeRepository additionalCostTypeRepository) {
        return args -> {
            List<ApartmentType> apartmentTypes = Arrays.asList(
                    new ApartmentType("DORMITORY", "DORMITORY"),
                    new ApartmentType("ROOM", "ROOM")
            );

            apartmentTypes.forEach(apartmentType -> {
                if (!apartmentTypeRepository.existsById(apartmentType.getName())) {
                    apartmentTypeRepository.save(apartmentType);
                }
            });

            List<AdditionalCostType> additionalCostTypes = Arrays.asList(
                    new AdditionalCostType("PERSONNEL_COST_PER_MONTH", "PERSONNEL_COST_PER_MONTH"),
                    new AdditionalCostType("UNIT_COST_PER_MONTH", "UNIT_COST_PER_MONTH"),
                    new AdditionalCostType("ROOM_COST_PER_MONTH", "ROOM_COST_PER_MONTHs")
            );

            additionalCostTypes.forEach(additionalCostType -> {
                if (!additionalCostTypeRepository.existsById(additionalCostType.getName())) {
                    additionalCostTypeRepository.save(additionalCostType);
                }
            });
        };
    }

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Bean
    CommandLineRunner createUnaccentExtension() {
        return args -> {
            jdbcTemplate.execute("CREATE EXTENSION IF NOT EXISTS unaccent");
        };
    }
}
