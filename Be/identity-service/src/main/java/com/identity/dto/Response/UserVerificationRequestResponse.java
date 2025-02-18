package com.identity.dto.Response;

import java.time.Instant;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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

    Instant createdAt;
}
