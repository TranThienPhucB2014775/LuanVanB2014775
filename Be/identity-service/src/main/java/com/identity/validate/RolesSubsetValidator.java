package com.identity.validate;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.identity.constant.Roles;

public class RolesSubsetValidator implements ConstraintValidator<RolesSubset, String> {
    private Roles[] subset;

    @Override
    public void initialize(RolesSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        try {
            Roles roles = Roles.valueOf(value.toUpperCase());
            return Arrays.asList(subset).contains(roles);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
