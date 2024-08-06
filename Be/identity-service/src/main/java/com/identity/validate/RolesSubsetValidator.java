package com.identity.validate;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.identity.constant.Roles;

public class RolesSubsetValidator implements ConstraintValidator<RolesSubset, Roles> {
    private Roles[] subset;

    @Override
    public void initialize(RolesSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(Roles value, ConstraintValidatorContext context) {
        return value == null || Arrays.asList(subset).contains(value);
    }
}
