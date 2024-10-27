package com.interact.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import com.interact.constant.ReportType;
import com.interact.validate.ReportTypeSubset;

import lombok.Getter;

@Getter
public class ReportCreationRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "ITEM_ID_INCORRECT")
    @NotBlank(message = "ITEM_ID_EMPTY")
    String itemId;

    @NotBlank(message = "INVALID_VALUE")
    String message;

    @ReportTypeSubset(anyOf = {ReportType.APARTMENT, ReportType.RENTAL_POST, ReportType.USER})
    String reportType;
}
