package com.identity.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDateTime;

@Setter
@Getter
@Builder
public class UserVerificationRequestResponse {

    String id;

    String userId;

    String cardId;

    String urlCardId;

    Boolean isChecked;

    Boolean isSuccessful;

    String message;

    LocalDateTime createdAt;
}
