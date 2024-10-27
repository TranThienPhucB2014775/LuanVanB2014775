package com.property.dto.request;

import com.property.annotation.PastYearMonth;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@PastYearMonth
@Getter
@ToString
@Setter
public class MonthlyUsageCreationRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String roomId;

    @Min(value = 1, message = "INVALID_VALUE")
    @Max(value = 12, message = "INVALID_VALUE")
    int month;

    int year;

    @NotNull(message = "INVALID_VALUE")
    String additionalCostId;

    @NotNull(message = "INVALID_VALUE")
    BigDecimal usage;
}
