package com.post.validation;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.post.constant.TenantPostType;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TenantPostTypeSubsetValidator implements ConstraintValidator<TenantPostTypeSubset, String> {
    private TenantPostType[] subset;

    @Override
    public void initialize(TenantPostTypeSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        try {
            TenantPostType tenantPostType = TenantPostType.valueOf(value.toUpperCase());
            log.info("Validating apartment type: {}", tenantPostType);
            return Arrays.asList(subset).contains(tenantPostType);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
