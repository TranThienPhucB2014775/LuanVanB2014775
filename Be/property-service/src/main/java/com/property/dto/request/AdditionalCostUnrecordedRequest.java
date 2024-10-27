package com.property.dto.request;

import com.property.annotation.PastYearMonth;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;

@Getter
@PastYearMonth
public class AdditionalCostUnrecordedRequest {
    @Min(value = 1, message = "INVALID_VALUE")
    @Max(value = 12, message = "INVALID_VALUE")
    int month;

    int year;
}
