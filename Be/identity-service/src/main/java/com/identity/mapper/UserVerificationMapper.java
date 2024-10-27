package com.identity.mapper;

import com.identity.dto.Response.UserVerificationRequestResponse;
import com.identity.dto.Response.UserVerificationResponse;
import com.identity.entity.UserVerification;
import com.identity.entity.UserVerificationRequest;

public class UserVerificationMapper {

    public static UserVerificationResponse toUserVerificationResponse(UserVerification userVerification) {
        return UserVerificationResponse.builder()
                .cardId(userVerification.getCardId())
                .id(userVerification.getId())
                .urlCardId(userVerification.getUrlCardId())
                .userId(userVerification.getUserId())
                .build();
    }
}
