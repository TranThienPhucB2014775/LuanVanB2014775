package com.property.validation;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.property.constant.RentStatus;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RentStatusSubsetValidator implements ConstraintValidator<RentStatusSubset, String> {
    private RentStatus[] subset;

    @Override
    public void initialize(RentStatusSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        log.info("Validating RentStatusSubsetValidator{}", value);
        if (value == null) {
            return false;
        }

        try {
            RentStatus rentStatus = RentStatus.valueOf(value.toUpperCase());
            return Arrays.asList(subset).contains(rentStatus);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
