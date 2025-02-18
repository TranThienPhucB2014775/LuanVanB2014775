package com.property.validation;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.property.constant.AdditionalCostTypes;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AdditionalCostTypeSubsetValidator implements ConstraintValidator<AdditionalCostTypeSubset, String> {
    private AdditionalCostTypes[] subset;

    @Override
    public void initialize(AdditionalCostTypeSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        log.info("Validating additional cost type: {}", value);
        if (value == null) {
            return false;
        }

        log.info("Validating additional cost type: {}", value);

        try {
            AdditionalCostTypes additionalCostTypes = AdditionalCostTypes.valueOf(value.toUpperCase());
            log.info("Validating apartment type: {}", additionalCostTypes);
            return Arrays.asList(subset).contains(additionalCostTypes);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
