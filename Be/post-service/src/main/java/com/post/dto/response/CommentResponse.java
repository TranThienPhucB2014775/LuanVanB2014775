package com.post.dto.response;

import java.time.Instant;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
    long page;
    Instant createdAt;
    Instant updatedAt;

    CommentResponse commentParent;
}
