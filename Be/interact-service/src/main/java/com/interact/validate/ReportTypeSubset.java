package com.interact.validate;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import com.interact.constant.ReportType;

@Documented
@Target({METHOD, FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = ReportTypeValidator.class)
public @interface ReportTypeSubset {
    ReportType[] anyOf();

    String message() default "REPORT_TYPE_NOT_VALID";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
