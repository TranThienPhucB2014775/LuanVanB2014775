package com.identity.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.identity.dto.Request.UserCreateRequest;
import com.identity.dto.Response.ProfileResponse;
import com.identity.dto.Response.UserResponse;
import com.identity.entity.User;

public class UserMapper {
    public static User userCreateRequestToUser(UserCreateRequest userCreateRequest) {
        User user = new User();
        user.setPassword(userCreateRequest.getPassword());
        user.setEmail(userCreateRequest.getEmail());
        return user;
    }

    public static UserResponse userToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .createdDate(user.getCreatedAt())
                .Enable(user.getEnabled())
                .build();
    }

    public static List<UserResponse> addProfileToUserResponse(
            List<User> users, List<ProfileResponse> profileResponses) {

        List<UserResponse> userResponses = users.stream()
                .map(user -> {
                    UserResponse userResponse = userToUserResponse(user);
                    profileResponses.stream()
                            .filter(profileResponse ->
                                    profileResponse.getProfileId().equals(user.getProfileId()))
                            .findFirst()
                            .ifPresent(profileResponse -> {
                                userResponse.setCity(profileResponse.getCity());
                                userResponse.setAddress(profileResponse.getAddress());
                            });
                    return userResponse;
                })
                .collect(Collectors.toList());

        return userResponses;
    }
}
