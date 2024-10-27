package com.post.service;

import com.post.entity.Image;
import com.post.entity.RentalPost;
import com.post.exception.AppException;
import com.post.exception.ErrorCode;
import com.post.repository.ImageRepository;
import com.post.repository.RentalPostRepository;
import com.post.service.client.MediaClientService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ImageService {

    RentalPostRepository rentalPostRepository;
    ImageRepository imageRepository;
    MediaClientService mediaClientService;

    public void uploadImage(List<MultipartFile> fileList, String postId) {

        RentalPost rentalPost = rentalPostRepository.findById(postId).orElseThrow(
                () -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND)
        );

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        log.info("User id: {}", userId);
        log.info("Authorities: {}", rentalPost.getUserId());
        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!rentalPost.getUserId().equals(userId)) {
                log.info("1");
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        log.info("User id: {}", userId);

        List<String> uuidImages = new ArrayList<>();
        log.info("User id: {}", userId);

        fileList.forEach(multipartFile -> {
            String uuid = UUID.randomUUID().toString();
            uuidImages.add(uuid);
            log.info("Upload image to media service with uuid: {}", uuid);
            imageRepository.save(Image.builder()
                    .imageUrl(uuid + ".jpg")
                    .postId(postId)
                    .userId(userId)
                    .build());
        });

        log.info("User id: {}", userId);
        mediaClientService.uploadMediaImg(fileList, uuidImages);
        log.info("User id: {}", userId);

    }

    public void deleteImage(String imageId) {

        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!image.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        imageRepository.deleteById(imageId);
        mediaClientService.deleteMediaImg(image.getImageUrl());
    }

    public void updateImage(MultipartFile multipartFile, String imageId) {

        Image image = imageRepository.findById(imageId)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_NOT_FOUND));

        mediaClientService.uploadMediaImg(
                List.of(multipartFile),
                List.of(image.getImageUrl().substring(0, image.getImageUrl().lastIndexOf('.')))
        );
    }

}
