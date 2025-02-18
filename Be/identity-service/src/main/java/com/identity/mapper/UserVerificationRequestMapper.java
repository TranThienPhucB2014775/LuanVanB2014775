package com.identity.mapper;

import com.identity.dto.Response.UserVerificationRequestResponse;
import com.identity.entity.UserVerificationRequest;

public class UserVerificationRequestMapper {

    public static UserVerificationRequestResponse UserVerificationRequestCreationRequestToUserVerificationRequest(
            UserVerificationRequest request) {
        return UserVerificationRequestResponse.builder()
                .cardId(request.getCardId())
                .userId(request.getUserId())
                .urlCardId(request.getUrlIdCardNumber())
                .isChecked(request.getIsChecked())
                .isSuccessful(request.getIsSuccessful())
                .message(request.getMessage())
                .id(request.getUserVerificationRequestId())
                .createdAt(request.getCreatedAt())
                .build();
    }
}
