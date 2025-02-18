package com.property.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Payload;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface PastYearMonth {

    String message() default "The month and year must be in the past";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
