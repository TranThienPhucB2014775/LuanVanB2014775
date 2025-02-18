package com.notification.controller;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import com.event.dto.CreateNotificationEvent;
import com.notification.service.NotificationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class KafkaNotificationListener {

    NotificationService notificationService;

    @KafkaListener(topics = "create-notification")
    public void listenCreateNotification(CreateNotificationEvent message) {
        log.info("Message received: {}", message);
        notificationService.createNotification(message);
    }
}
