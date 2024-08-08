package com.property.validation;


import com.property.constant.ApartmentTypes;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

@Slf4j
public class ApartmentTypeSubsetValidator implements ConstraintValidator<ApartmentTypeSubset, String> {
    private ApartmentTypes[] subset;

    @Override
    public void initialize(ApartmentTypeSubset constraint) {
        this.subset = constraint.anyOf();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        log.info("Validating apartment type: {}", value);
        log.info("Validating apartment type subset: {}", Arrays.asList(subset));
        log.info("Validating apartment type subset: {}", Arrays.asList(subset).contains(value));

        if(value == null) {
            return false;
        }

        try {
            ApartmentTypes apartmentType = ApartmentTypes.valueOf(value.toUpperCase());
            return Arrays.asList(subset).contains(apartmentType);

        } catch (IllegalArgumentException e) {
            return false; // Giá trị không phải là thành viên enum hợp lệ
        }
    }
}
