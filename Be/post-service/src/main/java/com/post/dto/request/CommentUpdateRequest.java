package com.post.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class CommentUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String commentId;

    @NotBlank(message = "INVALID_VALUE")
    String content;


}
