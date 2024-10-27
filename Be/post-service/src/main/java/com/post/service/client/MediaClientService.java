package com.post.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@FeignClient(name = "media-service")
public interface MediaClientService {
    @PostMapping(value = "/media", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    void uploadMediaImg(@RequestPart("image") List<MultipartFile> file, @RequestParam("imageNames") List<String> fileNames);

    //    @PutMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    //    Map updateProfile(@RequestPart("image") MultipartFile file, @RequestParam("fileName") String id);

    @DeleteMapping(value = "/media/{imageId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    void deleteMediaImg(@PathVariable("imageId") String imageId);
}
