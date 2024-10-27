package com.post.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageResponse {
    String imageUrl;

    String imageId;
}
