package com.event.dto;

import com.interact.constant.ReportType;
import com.interact.validate.ReportTypeSubset;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class ReportCreationEvent {

    String itemId;

    String message;

    String reportType;

    String userId;
}
