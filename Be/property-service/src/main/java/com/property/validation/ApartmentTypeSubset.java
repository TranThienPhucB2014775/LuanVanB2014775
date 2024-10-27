package com.property.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import com.property.constant.ApartmentTypes;

@Documented
@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = ApartmentTypeSubsetValidator.class)
public @interface ApartmentTypeSubset {
    ApartmentTypes[] anyOf();

    String message() default "INVALID_APARTMENT_TYPE";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
