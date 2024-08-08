package com.property.controller;

import com.property.service.AdditionalCostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/additional-cost")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AdditionalCostController {
    AdditionalCostService additionalCostService;

    @PostMapping
    public void createAdditionalCost() {
        log.info("Creating additional cost");
        additionalCostService.createAdditionalCost();
    }

    @PutMapping
    public void updateAdditionalCost() {
        log.info("Updating additional cost");
        additionalCostService.updateAdditionalCost();
    }

    @DeleteMapping
    public void deleteAdditionalCost() {
        log.info("Deleting additional cost");
        additionalCostService.removeAdditionalCost();
    }

    @GetMapping
    public void getAdditionalCost() {
        log.info("Getting additional cost");
        additionalCostService.getAdditionalCostByApartmentId();
    }
}
