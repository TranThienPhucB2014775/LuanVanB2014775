package com.identity.mapper;

import com.identity.dto.Request.ProfileCreationRequest;
import com.identity.dto.Request.UserCreateRequest;
import com.identity.dto.Response.ProfileCreationResponse;
import com.identity.dto.Response.ProfileResponse;
import com.identity.dto.Response.UserResponse;

public class ProfileMapper {
    public static ProfileCreationRequest userCreateRequestToProfileCreationRequest(
            UserCreateRequest userCreateRequest) {
        return ProfileCreationRequest.builder()
                .city(userCreateRequest.getCity())
                .address(userCreateRequest.getAddress())
                .userName(userCreateRequest.getUserName())
                .build();
    }

    public static UserResponse profileResponseOnUserResponse(
            UserResponse userResponse, ProfileResponse profileResponse) {
        userResponse.setCity(profileResponse.getCity());
        userResponse.setAddress(profileResponse.getAddress());
        userResponse.setImgAvatar(profileResponse.getImgAvatar());
        userResponse.setUsername(profileResponse.getUserName());
        userResponse.setFacebook(profileResponse.getFacebook());
        userResponse.setPhoneNumber(profileResponse.getPhoneNumber());
        return userResponse;
    }

    public static UserResponse profileCreationResponseOnUserResponse(
            UserResponse userResponse, ProfileCreationResponse profileResponse) {
        userResponse.setCity(profileResponse.getCity());
        userResponse.setAddress(profileResponse.getAddress());
        userResponse.setImgAvatar(profileResponse.getImgAvatar());
        userResponse.setUsername(profileResponse.getUserName());
        return userResponse;
    }
}
