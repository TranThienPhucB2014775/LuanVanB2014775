package com.interact.controller;

import com.event.dto.ReportCreationEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.interact.dto.request.ReportCreationRequest;
import com.interact.service.ReportService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KafkaNotificationListener {

    ReportService reportService;

    @KafkaListener(topics = "create-report")
    public void createReport(ReportCreationEvent request) {
        log.info("Creating report {}", request);

        reportService.createReport(request);
    }
}
