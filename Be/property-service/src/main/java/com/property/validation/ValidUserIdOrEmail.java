package com.property.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = UserIdOrEmailValidator.class)
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidUserIdOrEmail {
    String message() default "EMAIL_AND_USER_ID_NULL";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
