//package com.media.service;
//
//
//import com.cloudinary.Cloudinary;
//import com.cloudinary.utils.ObjectUtils;
//import com.media.dto.Response.CreateImageResponse;
//import com.media.dto.Response.UpdateImageResponse;
//import lombok.RequiredArgsConstructor;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.FileOutputStream;
//import java.io.IOException;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class CloudinaryService {
//
//    private static final Logger log = LoggerFactory.getLogger(CloudinaryService.class);
//    private final Cloudinary cloudinary;
//
//    public CreateImageResponse upload(MultipartFile multipartFile) throws IOException {
//        File file = convert(multipartFile);
//        Map params = ObjectUtils.asMap(
//                "resource_type", "auto",
//                "folder", "profile_images",
//                "overwrite", true,
//                "use_filename", true
//        );
//        Map uploadResult = cloudinary.uploader().upload(file, params);
//
//        file.delete();
//
//        return CreateImageResponse.builder()
//                .secure_url(uploadResult.get("secure_url").toString())
//                .build();
//    }
//
//    public void deleteImage(String publicId) throws IOException {
//        Map<String, Object> deleteParams = ObjectUtils.asMap("public_id", publicId);
//        cloudinary.uploader().destroy(publicId, deleteParams);
//    }
//
//    public UpdateImageResponse updateImage(String publicId, MultipartFile file) throws IOException {
//        Map updateParams = ObjectUtils.asMap("public_id", publicId);
//        Map uploadResult = cloudinary.uploader().upload(file, updateParams);
//
//        return UpdateImageResponse.builder()
//                .secure_url(uploadResult.get("secure_url").toString())
//                .build();
//    }
//
//    private File convert(MultipartFile multipartFile) throws IOException {
//        File file = new File(multipartFile.getOriginalFilename());
//        FileOutputStream fo = new FileOutputStream(file);
//        fo.write(multipartFile.getBytes());
//        fo.close();
//        return file;
//    }
//}
