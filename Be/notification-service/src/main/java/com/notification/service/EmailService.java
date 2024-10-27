package com.notification.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.notification.dto.request.EmailRequest;
import com.notification.dto.request.SendEmailRequest;
import com.notification.dto.request.Sender;
import com.notification.dto.response.EmailResponse;
import com.notification.exception.AppException;
import com.notification.exception.ErrorCode;
import com.notification.service.client.EmailClient;

import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EmailService {
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    EmailClient emailClient;

    @NonFinal
    @Value("${notification.email.brevo-apikey}")
    String apiKey;

    public EmailResponse sendEmail(SendEmailRequest request) {
        log.info("Sending email to: {}", request.getTo());
        EmailRequest emailRequest = EmailRequest.builder()
                .sender(Sender.builder()
                        .name("Devteria DotCom")
                        .email("ngandep2014anh2@gmail.com")
                        .build())
                .to(List.of(request.getTo()))
                .subject(request.getSubject())
                .htmlContent(request.getHtmlContent())
                .build();
        try {
            return emailClient.sendEmail(apiKey, emailRequest);
        } catch (FeignException e) {
            throw new AppException(ErrorCode.CANNOT_SEND_EMAIL);
        }
    }
}
