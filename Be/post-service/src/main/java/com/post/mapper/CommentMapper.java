package com.post.mapper;

import org.springframework.stereotype.Component;

import com.post.dto.request.CommentCreationRequest;
import com.post.dto.response.CommentResponse;
import com.post.dto.response.UserResponse;
import com.post.entity.Comment;

@Component
public class CommentMapper {

    public CommentResponse toCommentResponse(
            Comment comment, UserResponse userResponse, CommentResponse commentParent) {
        return CommentResponse.builder()
                .commentId(comment.getCommentId())
                .userName(userResponse != null ? userResponse.getUsername() : null)
                .userId(userResponse != null ? userResponse.getId() : null)
                .userEmail(userResponse != null ? userResponse.getEmail() : null)
                .imgAvatar(userResponse != null ? userResponse.getImgAvatar() : null)
                .content(comment.getIsAvailable() ? comment.getContent() : "This comment has been deleted")
                .isAvailable(comment.getIsAvailable())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .page(comment.getPage())
                .commentParent(
                        commentParent != null
                                ? CommentResponse.builder()
                                        .commentId(commentParent.getCommentId())
                                        .userName(commentParent.getUserName())
                                        .userId(commentParent.getUserId())
                                        .imgAvatar(commentParent.getImgAvatar())
                                        .content(commentParent.getContent())
                                        .isAvailable(commentParent.getIsAvailable())
                                        .createdAt(commentParent.getCreatedAt())
                                        .updatedAt(commentParent.getUpdatedAt())
                                        .page(commentParent.getPage())
                                        .build()
                                : null)
                .build();
    }

    public Comment toComment(CommentCreationRequest request, String userId, long page) {
        return Comment.builder()
                .postId(request.getPostId())
                .content(request.getContent())
                .parentId(request.getParentId())
                .userId(userId)
                .isAvailable(true)
                .page(page)
                .build();
    }
}
