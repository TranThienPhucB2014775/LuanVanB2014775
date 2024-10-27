package com.identity.service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@FeignClient(name = "media-service")
public interface MediaClientService {

    @PostMapping(value = "/media/card-id", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    Map uploadMediaImageCardId(@RequestPart("image") MultipartFile file, @RequestParam("imageNames") List<String> fileNames);

    //    @PutMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    //    Map updateProfile(@RequestPart("image") MultipartFile file, @RequestParam("fileName") String id);

    @GetMapping(value = "/card-id/{id}", consumes = MediaType.IMAGE_JPEG_VALUE)
    ResponseEntity<byte[]> getImgCardId(
            @RequestHeader("authorization") String token,
            @PathVariable("id") String id
    );
}
