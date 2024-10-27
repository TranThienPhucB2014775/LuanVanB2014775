package com.property.annotation;

import com.property.dto.request.MonthlyUsageCreationRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.time.LocalDate;
import java.time.YearMonth;

public class PastYearMonthValidator implements ConstraintValidator<PastYearMonth, MonthlyUsageCreationRequest> {

    @Override
    public void initialize(PastYearMonth constraintAnnotation) {
    }

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