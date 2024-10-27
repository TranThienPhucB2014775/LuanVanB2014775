package com.identity.dto.Response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class UserVerificationResponse {

    String id;

    String userId;

    String cardId;

    String urlCardId;
}
