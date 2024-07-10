package com.identity.service.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.identity.dto.ApiResponse;
import com.identity.dto.Request.ProfileCreationRequest;
import com.identity.dto.Response.ProfileCreationResponse;
import com.identity.dto.Response.ProfileResponse;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "profile-service")
public interface ProfileClientService {
    @PostMapping(value = "/profile", consumes = "application/json")
    ApiResponse<ProfileCreationResponse> createProfile(@RequestBody ProfileCreationRequest profileCreationRequest);

    @GetMapping(value = "/profile/{profileId}", consumes = "application/json")
    ApiResponse<ProfileResponse> getProfile(@PathVariable String profileId, @RequestHeader String Authorization);

    @GetMapping(value = "/profile/get-all", consumes = "application/json")
    ApiResponse<List<ProfileResponse>> getAllProfiles(@RequestHeader String Authorization);

    @PostMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ApiResponse<?> createImage(
            @RequestPart("image") MultipartFile file,
            @RequestPart(value = "profileId") String email,
            @RequestHeader String Authorization
    );
}
