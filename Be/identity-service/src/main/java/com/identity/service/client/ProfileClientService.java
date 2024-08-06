package com.identity.service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.ProfileCreationRequest;
import com.identity.dto.Response.ProfileCreationResponse;
import com.identity.dto.Response.ProfileResponse;

@FeignClient(name = "profile-service")
public interface ProfileClientService {
    @PostMapping(value = "/profile/create", consumes = "application/json")
    ApiResponse<ProfileCreationResponse> createProfile(@RequestBody ProfileCreationRequest profileCreationRequest);

    @GetMapping(value = "/profile", consumes = "application/json")
    ApiResponse<ProfileResponse> getProfile(@RequestHeader String Authorization);

    @GetMapping(value = "/profile/get-all", consumes = "application/json")
    ApiResponse<List<ProfileResponse>> getAllProfiles(@RequestHeader String Authorization);

    @GetMapping(value = "/profile/{userId}", consumes = "application/json")
    ApiResponse<ProfileResponse> getProfileByUserId(@PathVariable String userId, @RequestHeader String Authorization);

    @PutMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?> createImage(
            @RequestPart("image") MultipartFile file,
            @RequestParam(value = "profileId") String profileId,
            @RequestHeader String Authorization);
}
