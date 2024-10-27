package com.profile.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
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

    public ProfileResponse updateProfile(ProfileUpdateRequest request) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Profile profile = profileRepository
                .findByUserId(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND));

        if (!request.getCity().isEmpty()) {
            profile.setCity(request.getCity());
        }
        if (!request.getFacebook().isEmpty()) {
            profile.setFacebook(request.getFacebook());
        }
        if (!request.getAddress().isEmpty()) {
            profile.setAddress(request.getAddress());
        }
        if (!request.getPhoneNumber().isEmpty()) {
            profile.setPhoneNumber(request.getPhoneNumber());
        }
        if (!request.getPhoneNumber().isEmpty()) {
            profile.setPhoneNumber(request.getPhoneNumber());
        }
        if (!request.getAboutMe().isEmpty()) {
            profile.setAboutMe(request.getAboutMe());
        }
        if (!request.getZaloPhoneNumber().isEmpty()) {
            profile.setZaloPhoneNumber(request.getZaloPhoneNumber());
        }

        log.info(profile.toString());
        return ProfileMapper.ProfileToProfileResponse(profileRepository.save(profile));
    }

    public ProfileResponse getProfile() {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        return ProfileMapper.ProfileToProfileResponse(profileRepository
                .findByUserId(authentication.getName())
                .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND)));
    }

    public ProfileResponse getProfileByUserId(String userId) {
        return ProfileMapper.ProfileToProfileResponse(profileRepository
                .findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND)));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<ProfileResponse> getAllProfiles() {

        return profileRepository.findAll().stream()
                .map(ProfileMapper::ProfileToProfileResponse)
                .toList();
    }

    public UpdateAndCreateAvatarResponse UpdateAvatar(MultipartFile file) {
        try {

            var authentication = SecurityContextHolder.getContext().getAuthentication();

            Profile profile = profileRepository
                    .findByUserId(authentication.getName())
                    .orElseThrow(() -> new AppException(ErrorCode.PROFILE_NOT_FOUND));
            List<String> fileName = new ArrayList<>();

            if (profile.getImgAvatar().equals("default_Avatar.png")) {
                String originalFilename = file.getOriginalFilename();
                assert originalFilename != null;
                String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
                fileName.add(UUID.randomUUID().toString());
                //                fileName.add(UUID.randomUUID().toString());
                log.info("Update avatar successfully {}", fileName);
                mediaClientService.uploadMediaImg(file, fileName);
                profile.setImgAvatar(fileName.get(0) + ".jpg");
                profileRepository.save(profile);
            } else {
                fileName.add(profile.getImgAvatar());
                mediaClientService.uploadMediaImg(file, fileName);
            }

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
