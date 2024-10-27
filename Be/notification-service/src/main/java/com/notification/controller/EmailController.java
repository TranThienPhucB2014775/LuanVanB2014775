package com.notification.controller;

import com.event.dto.NotificationEvent;
import com.notification.dto.request.Recipient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.notification.dto.ApiResponse;
import com.notification.dto.request.SendEmailRequest;
import com.notification.dto.response.EmailResponse;
import com.notification.service.EmailService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Slf4j
@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailController {
    EmailService emailService;

    @PostMapping("/email/send")
    ApiResponse<EmailResponse> sendEmail(@RequestBody SendEmailRequest request) {
        return ApiResponse.<EmailResponse>builder()
                .result(emailService.sendEmail(request))
                .build();
    }

    @KafkaListener(topics = "notification-delivery")
    public void listenNotificationDelivery(NotificationEvent message) {
        log.info("Message received: {}");
        emailService.sendEmail(SendEmailRequest.builder()
                .to(Recipient.builder().email(message.getRecipient()).build())
                .subject(message.getSubject())
                .htmlContent(message.getBody())
                .build());
    }

}
