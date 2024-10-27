package com.interact.validate;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import com.interact.constant.FeedBackTypes;

@Documented
@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = FeedBackTypeValidator.class)
public @interface FeedBackTypeSubset {
    FeedBackTypes[] anyOf();

    String message() default "FEED_BACK_TYPE_INVALID";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
