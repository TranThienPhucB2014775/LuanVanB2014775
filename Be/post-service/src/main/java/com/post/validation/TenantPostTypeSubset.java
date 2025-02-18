package com.post.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import com.post.constant.TenantPostType;

@Documented
@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = TenantPostTypeSubsetValidator.class)
public @interface TenantPostTypeSubset {
    TenantPostType[] anyOf();

    String message() default "INVALID_RENTAL_POST_TYPE";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
