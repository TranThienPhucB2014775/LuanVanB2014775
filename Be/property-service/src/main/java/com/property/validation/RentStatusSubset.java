package com.property.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import com.property.constant.RentStatus;

@Documented
@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = RentStatusSubsetValidator.class)
public @interface RentStatusSubset {
    RentStatus[] anyOf();

    String message() default "RENT_STATUS_INVALID";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
