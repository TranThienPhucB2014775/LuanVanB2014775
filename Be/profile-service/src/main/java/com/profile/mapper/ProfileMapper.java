package com.profile.mapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.profile.dto.Request.ProfileCreationRequest;
import com.profile.dto.Request.ProfileUpdateRequest;
import com.profile.dto.Response.ProfileResponse;
import com.profile.entity.Profile;

public class ProfileMapper {
    private static final Logger log = LoggerFactory.getLogger(ProfileMapper.class);

    public static ProfileResponse ProfileToProfileResponse(Profile profile) {
        ProfileResponse profileResponse = new ProfileResponse();
        profileResponse.setUserName(profile.getUserName());
        profileResponse.setProfileId(profile.getId());
        profileResponse.setAddress(profile.getAddress());
        profileResponse.setCity(profile.getCity());
        profileResponse.setImgAvatar(""+profile.getImgAvatar());
        profileResponse.setFacebook(profile.getFacebook());
        profileResponse.setPhoneNumber(profile.getPhoneNumber());
        return profileResponse;
    }

    public static Profile ProfileCreationRequestToProfile(ProfileCreationRequest profileRequest) {
        Profile profile = new Profile();
        profile.setUserId(profileRequest.getUserId());
        profile.setAddress(profileRequest.getAddress());
        profile.setCity(profileRequest.getCity());
        profile.setUserName(profileRequest.getUserName());
        return profile;
    }

    public static Profile ProfileUpdateRequestToProfile(ProfileUpdateRequest profileRequest) {
        Profile profile = new Profile();
//        profile.setId(profileRequest.getProfileId());
        profile.setAddress(profileRequest.getAddress());
        profile.setCity(profileRequest.getCity());
        return profile;
    }
}
