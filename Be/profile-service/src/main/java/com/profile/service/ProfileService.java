package com.profile.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.profile.dto.ApiResponse;
import com.profile.dto.Response.MediaReposne;
import com.profile.dto.Response.UpdateAndCreateAvatarResponse;
import com.profile.dto.Response.UserResponse;
import com.profile.service.client.MediaClientService;
import feign.FeignException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.profile.config.CustomJwtDecoder;
import com.profile.dto.Request.ProfileCreationRequest;
import com.profile.dto.Request.ProfileUpdateRequest;
import com.profile.dto.Response.ProfileResponse;
import com.profile.entity.Profile;
import com.profile.exception.AppException;
import com.profile.exception.ErrorCode;
import com.profile.mapper.ProfileMapper;
import com.profile.repository.ProfileRepository;
import com.profile.service.client.UserClientService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

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

    public UpdateAndCreateAvatarResponse createAndUpdateAvatar(MultipartFile file, String ProfileId) {
        try {

            Profile profile = profileRepository.findById(ProfileId).orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND));
            Map mediaReposneApiResponse;
            if (profile.getUrlImgAvatar() != null) {
                mediaReposneApiResponse = mediaClientService.createProfile(file);
            } else {

                int index = profile.getUrlImgAvatar().indexOf("profile_images");
                if (index != -1) {
                    String path = profile.getUrlImgAvatar().substring(index);

                    System.out.println(path);

                    mediaReposneApiResponse = mediaClientService.updateProfile(file, profile.getUrlImgAvatar());
                } else {
                    throw new AppException(ErrorCode.MEDIA_SERVICE_ERROR);
                }
            }

            Map result = (Map) mediaReposneApiResponse.get("result");
            log.info(result.get("secure_url").toString());
            profile.setUrlImgAvatar(result.get("secure_url").toString());

            profileRepository.save(profile);

            return UpdateAndCreateAvatarResponse.builder().message("Create avatar successfully").build();
        } catch (FeignException e) {
            log.info(e.getMessage());
            throw new AppException(ErrorCode.MEDIA_SERVICE_ERROR);
        } catch (Exception e) {
            log.info(e.getMessage());
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }

    }
}
