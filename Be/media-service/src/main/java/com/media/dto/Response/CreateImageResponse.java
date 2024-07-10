package com.media.dto.Response;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

@Builder
@Getter
@Setter
public class CreateImageResponse {
    private String secure_url;
}
