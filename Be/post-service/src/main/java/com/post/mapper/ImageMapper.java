package com.post.mapper;

import com.post.dto.response.ImageResponse;
import com.post.entity.Image;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ImageMapper {

    public List<ImageResponse> toImageResponse(List<Image> images) {
        return images.stream()
                .map(image -> ImageResponse.builder()
                        .imageId(image.getImageId())
                        .imageUrl(image.getImageUrl())
                        .build())
                .collect(Collectors.toList());
    }

}
