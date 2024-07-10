package com.media.dto.Response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class GetImageResponse {
    private String secure_url;
}
