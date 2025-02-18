package com.identity.mapper;

import com.identity.dto.Response.UserVerificationResponse;
import com.identity.entity.UserVerification;

public class UserVerificationMapper {

    public static UserVerificationResponse toUserVerificationResponse(UserVerification userVerification) {
        return UserVerificationResponse.builder()
                .cardId(userVerification.getCardId())
                .id(userVerification.getUserVerificationId())
                .urlCardId(userVerification.getUrlCardId())
                .userId(userVerification.getUserId())
                .build();
    }
}
