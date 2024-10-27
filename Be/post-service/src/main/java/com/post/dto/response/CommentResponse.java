package com.post.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Builder
public class CommentResponse {

    String commentId;
    String userName;
    String userId;
    String userEmail;
    String imgAvatar;
    String content;
    Boolean isAvailable;

    Instant createdAt;
    Instant updatedAt;

    CommentResponse commentParent;
}
