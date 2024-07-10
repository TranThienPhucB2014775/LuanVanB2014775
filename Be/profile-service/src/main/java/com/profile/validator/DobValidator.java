package com.profile.validator;

import java.time.LocalDate;
import java.time.Period;
import java.util.Objects;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DobValidator implements ConstraintValidator<DobConstraint, LocalDate> {

    private int min;

    @Override
    public boolean isValid(LocalDate value, ConstraintValidatorContext context) {
        if (Objects.isNull(value)) return true;

        Period period = Period.between(value, LocalDate.now());

        // Check if the year difference is less than min
        if (period.getYears() < min) {
            return false;
        }

        // If the year difference is exactly min, check if the current date is before the birthday in the min year
        if (period.getYears() == min) {
            return !(period.getMonths() > 0 || (period.getMonths() == 0 && period.getDays() > 0));
        }

        return true;
    }

    @Override
    public void initialize(DobConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        min = constraintAnnotation.min();
    }
}
