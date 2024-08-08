package com.property.service;

import com.property.repository.AdditionalCostRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AdditionalCostService {
    AdditionalCostRepository additionalCostRepository;

    public void createAdditionalCost() {
        log.info("Add additional cost");
    }

    public void removeAdditionalCost() {
        log.info("Remove additional cost");
    }

    public void updateAdditionalCost() {
        log.info("Update additional cost");
    }

    public void getAdditionalCostByApartmentId() {
        log.info("Get additional cost by apartment id");
    }


}
