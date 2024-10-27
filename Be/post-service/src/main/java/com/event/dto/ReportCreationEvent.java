package com.event.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReportCreationEvent {

    String itemId;

    String message;

    String reportType;

    String userId;
}
