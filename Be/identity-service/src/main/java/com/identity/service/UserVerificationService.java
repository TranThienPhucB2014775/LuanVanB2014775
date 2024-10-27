package com.identity.service;

import com.identity.dto.Request.IsTenantRentingFromLandlordRequest;
import com.identity.dto.Response.UserVerificationResponse;
import com.identity.entity.UserVerification;
import com.identity.exception.AppException;
import com.identity.exception.ErrorCode;
import com.identity.mapper.UserVerificationMapper;
import com.identity.repository.UserVerificationRepository;
import com.identity.repository.UserVerificationRequestRepository;
import com.identity.service.client.PropertyClientService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserVerificationService {

    UserVerificationRepository userVerificationRepository;

    PropertyClientService propertyClientService;

    public UserVerification save(UserVerification userVerification) {

        Optional<UserVerification> userVerification1 = userVerificationRepository.findByUserId(userVerification.getUserId());

        if (userVerification1.isPresent()) {
            userVerification1.get().setCardId(userVerification.getCardId());
            userVerification1.get().setUrlCardId(userVerification.getUrlCardId());
            return userVerificationRepository.save(userVerification1.get());
        }

        return userVerificationRepository.save(userVerification);
    }

    public Boolean isVerified(String userId) {
        return userVerificationRepository.existsByUserId(userId);
    }

    public UserVerificationResponse findByUserId(String userId, String token) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getName().equals(userId)) {
            var res = propertyClientService.isTenantRentingFromLandlord(
                    IsTenantRentingFromLandlordRequest.builder()
                            .landlordId(authentication.getName())
                            .tenantId(userId)
                            .build(),
                    token
            );
            if (!res.getResult()) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        return UserVerificationMapper.toUserVerificationResponse(
                userVerificationRepository.findByUserId(userId)
                        .orElseThrow(() -> new AppException(ErrorCode.USER_VERIFICATION_NOT_FOUND))
        );
    }

}
