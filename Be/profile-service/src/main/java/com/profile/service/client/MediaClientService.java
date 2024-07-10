package com.profile.service.client;

import com.profile.dto.ApiResponse;
import com.profile.dto.Response.MediaReposne;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@FeignClient(name = "media-service")
public interface MediaClientService {
    @PostMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Map createProfile(@RequestPart("image") MultipartFile file);

    @PostMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Map updateProfile(
            @RequestPart("image") MultipartFile file,
            @RequestParam("public_id") String id
    );
}
