package com.media.service;

import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.StorageClient;
import com.media.dto.Response.CreateImageResponse;
import com.media.dto.Response.UpdateImageResponse;
import com.media.exception.AppException;
import com.media.exception.ErrorCode;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.UUID;

@Service
@Slf4j
public class ImageService {

    @Value("${firebase.baseUrl}")
    private String baseUrl;

    @Value("${firebase.bucketName}")
    private String bucketName;

    @Value("${firebase.privateKey}")
    private String privateKey;

    private String uploadFile(File file, String fileName) throws IOException {
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        InputStream inputStream = ImageService.class.getClassLoader().getResourceAsStream(privateKey); // change the file name with your one
        Credentials credentials = GoogleCredentials.fromStream(inputStream);
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        var res = storage.create(blobInfo, Files.readAllBytes(file.toPath()));

        log.info("data{}", res.getName());

        return String.format("%s%s%s",
                baseUrl,
                res.getName(),
                "?alt=media"
        );
    }


    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }


    public CreateImageResponse upload(MultipartFile multipartFile) {
        try {
            String fileName = multipartFile.getOriginalFilename();
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

            File file = this.convertToFile(multipartFile, fileName);
            String URL = this.uploadFile(file, fileName);
            file.delete();
            return CreateImageResponse.builder().secure_url(URL).build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.FIREBASE_EXCEPTION);
        }
    }
    public UpdateImageResponse updateImage(String publicId, MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();

            File tempFile = this.convertToFile(file, fileName);
            String URL = this.uploadFile(tempFile, fileName);
            tempFile.delete();
            return UpdateImageResponse.builder().message(URL).build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.FIREBASE_EXCEPTION);
        }
    }
}
