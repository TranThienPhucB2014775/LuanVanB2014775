package com.property.validation;

import com.property.constant.AdditionalCostTypes;
import com.property.constant.ReportIssueStatus;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

@Slf4j
public class ReportIssueSubsetValidator implements ConstraintValidator<ReportIssueTypeSubset, String> {
    private ReportIssueStatus[] subset;

    @Override
    public void initialize(ReportIssueTypeSubset constraint) {
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
            ReportIssueStatus reportIssueStatus = ReportIssueStatus.valueOf(value.toUpperCase());
            log.info("Validating apartment type: {}", reportIssueStatus);
            return Arrays.asList(subset).contains(reportIssueStatus);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
