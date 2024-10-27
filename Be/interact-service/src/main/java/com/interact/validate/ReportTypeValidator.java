package com.interact.validate;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.interact.constant.ReportType;

public class ReportTypeValidator implements ConstraintValidator<ReportTypeSubset, String> {
    private ReportType[] subset;

    @Override
    public void initialize(ReportTypeSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        try {
            ReportType reportType = ReportType.valueOf(value.toUpperCase());
            return Arrays.asList(subset).contains(reportType);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
