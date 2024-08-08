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
        try{
            return value == null || Arrays.asList(subset).contains(value);
        } catch (IllegalArgumentException e) {
            return false;
        }

    }
}
