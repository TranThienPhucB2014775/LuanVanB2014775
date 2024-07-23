package com.profile.service.client;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "media-service")
public interface MediaClientService {
    @PostMapping(value = "/media", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Map uploadMediaImg(
            @RequestPart("image") MultipartFile file,
            @RequestParam("imageNames") List<String> fileNames
    );

//    @PutMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    Map updateProfile(@RequestPart("image") MultipartFile file, @RequestParam("fileName") String id);
}
