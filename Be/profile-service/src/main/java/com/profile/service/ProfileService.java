package com.profile.service;

import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.profile.config.CustomJwtDecoder;
import com.profile.dto.Request.ProfileCreationRequest;
import com.profile.dto.Request.ProfileUpdateRequest;
import com.profile.dto.Response.ProfileResponse;
import com.profile.dto.Response.UpdateAndCreateAvatarResponse;
import com.profile.entity.Profile;
import com.profile.exception.AppException;
import com.profile.exception.ErrorCode;
import com.profile.mapper.ProfileMapper;
import com.profile.repository.ProfileRepository;
import com.profile.service.client.MediaClientService;
import com.profile.service.client.UserClientService;

import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ProfileService {

    ProfileRepository profileRepository;
    CustomJwtDecoder customJwtDecoder;
    UserClientService userClientService;
    MediaClientService mediaClientService;

    public ProfileResponse createProfile(ProfileCreationRequest profileRequest) {
        Profile profile = ProfileMapper.ProfileCreationRequestToProfile(profileRequest);
        profile.setImgAvatar("default_Avatar.png");

        try {
            return ProfileMapper.ProfileToProfileResponse(profileRepository.save(profile));
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }

    public ProfileResponse updateProfile(ProfileUpdateRequest profileUpdateRequest, String token) {
        var jwt = customJwtDecoder.decode(token);
        Profile profile = ProfileMapper.ProfileUpdateRequestToProfile(profileUpdateRequest);
        log.info(profile.toString());
        return ProfileMapper.ProfileToProfileResponse(profileRepository.save(profile));
    }

    public ProfileResponse getProfile(String id) {

        return ProfileMapper.ProfileToProfileResponse(
                profileRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<ProfileResponse> getAllProfiles() {

        return profileRepository.findAll().stream()
                .map(ProfileMapper::ProfileToProfileResponse)
                .toList();
    }

    public UpdateAndCreateAvatarResponse UpdateAvatar(MultipartFile file, String ProfileId) {
        try {
            Profile profile = profileRepository
                    .findById(ProfileId)
                    .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND));
            if (profile.getImgAvatar().equals("default_Avatar.png")) {
                String fileName = UUID.randomUUID().toString().concat(file.getOriginalFilename());
                mediaClientService.updateProfile(file, fileName);
                profile.setImgAvatar(fileName);
                profileRepository.save(profile);
            }
            mediaClientService.updateProfile(file, profile.getImgAvatar());

            return UpdateAndCreateAvatarResponse.builder()
                    .message("Update avatar successfully")
                    .build();
        } catch (FeignException e) {
            log.info(e.getMessage());
            throw new AppException(ErrorCode.MEDIA_SERVICE_ERROR);
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
    }
}
