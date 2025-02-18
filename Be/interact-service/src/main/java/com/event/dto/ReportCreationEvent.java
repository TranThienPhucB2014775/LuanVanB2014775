package com.event.dto;

import lombok.Getter;

@Getter
public class ReportCreationEvent {

    String itemId;

    String message;

    String reportType;

    String userId;
}
