package com.interact.validate;

import java.util.Arrays;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.interact.constant.FeedBackTypes;

public class FeedBackTypeValidator implements ConstraintValidator<FeedBackTypeSubset, String> {
    private FeedBackTypes[] subset;

    @Override
    public void initialize(FeedBackTypeSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return false;
        }

        try {
            FeedBackTypes feedBackTypes = FeedBackTypes.valueOf(value.toUpperCase());
            return Arrays.asList(subset).contains(feedBackTypes);

        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
