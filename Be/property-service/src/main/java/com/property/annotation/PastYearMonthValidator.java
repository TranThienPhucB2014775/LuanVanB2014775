package com.property.annotation;

import java.time.YearMonth;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.property.dto.request.MonthlyUsageCreationRequest;

public class PastYearMonthValidator implements ConstraintValidator<PastYearMonth, MonthlyUsageCreationRequest> {

    @Override
    public void initialize(PastYearMonth constraintAnnotation) {}

    @Override
    public boolean isValid(MonthlyUsageCreationRequest request, ConstraintValidatorContext context) {
        if (request == null) {
            return true;
        }

        YearMonth currentYearMonth = YearMonth.now();
        YearMonth requestYearMonth = YearMonth.of(request.getYear(), request.getMonth());

        return requestYearMonth.isBefore(currentYearMonth);
    }
}
