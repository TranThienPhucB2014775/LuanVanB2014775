package com.identity.mapper;

import com.identity.dto.Request.UserCreateRequest;
import com.identity.dto.Response.AllUserResponse;
import com.identity.dto.Response.UserResponse;
import com.identity.entity.User;
import com.identity.repository.UserVerificationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserMapper {

    UserVerificationRepository userVerificationRepository;

    public User userCreateRequestToUser(UserCreateRequest userCreateRequest) {
        User user = new User();
        user.setPassword(userCreateRequest.getPassword());
        user.setEmail(userCreateRequest.getEmail());
        return user;
    }

    public UserResponse userToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .createdDate(user.getCreatedAt())
                .Enable(user.getEnabled())
                .role(user.getRoles().stream().findFirst().get().getName())
                .isVerified(userVerificationRepository.existsByUserId(user.getId()))
                .build();
    }

    public AllUserResponse userToAllUserResponse(User user) {
        return AllUserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .createdDate(user.getCreatedAt())
                .Enable(user.getEnabled())
                .Role(user.getRoles().stream().findFirst().get().getName())
                .isVerified(userVerificationRepository.existsByUserId(user.getId()))
                .build();
    }
}