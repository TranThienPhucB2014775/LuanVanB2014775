package com.post.service;

import com.event.dto.CreateNotificationEvent;
import com.event.dto.ReportCreationEvent;
import com.post.dto.request.CommentCreationRequest;
import com.post.dto.request.CommentReportRequest;
import com.post.dto.request.CommentUpdateRequest;
import com.post.dto.response.CommentResponse;
import com.post.dto.response.ListResponse;
import com.post.dto.response.UserResponse;
import com.post.entity.Comment;
import com.post.entity.RentalPost;
import com.post.exception.AppException;
import com.post.exception.ErrorCode;
import com.post.mapper.CommentMapper;
import com.post.repository.CommentRepository;
import com.post.repository.RentalPostRepository;
import com.post.service.client.UserClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CommentService {

    CommentRepository commentRepository;

    CommentMapper commentMapper;

    UserClient userClient;

    KafkaTemplate<String, Object> kafkaTemplate;
    private final RentalPostRepository rentalPostRepository;

    public CommentResponse createComment(CommentCreationRequest request) {

        RentalPost rentalPost = rentalPostRepository.findById(request.getPostId())
                .orElseThrow(() -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND));

        kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                .recipient(rentalPost.getUserId())
                .message("Ai đó đã bình luận bài viết \"" + rentalPost.getTitle() + "\" của bạn")
                .build());

        if (request.getParentId() != null) {
            Comment parentComment = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
            String content;
            if (parentComment.getContent().length() > 30) {
                content = parentComment.getContent().substring(0, 30);
            } else {
                content = parentComment.getContent();
            }

            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(parentComment.getUserId())
                    .message("Ai đó đã trả lời bình luận \"" + content + "\" của bạn")
                    .build());
        }

        return commentMapper.toCommentResponse(
                commentRepository.save(
                        commentMapper.toComment(
                                request,
                                SecurityContextHolder.getContext().getAuthentication().getName()
                        )
                ),
                userClient.getUserByUserId(SecurityContextHolder.getContext().getAuthentication().getName()).getResult(),
                null
        );

    }

    public CommentResponse updateComment(CommentUpdateRequest request) {

        Comment comment = commentRepository.findById(request.getCommentId())
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!comment.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        comment.setContent(request.getContent());

        return commentMapper.toCommentResponse(
                commentRepository.save(comment),
                null,
                null
        );
    }

    public void deleteComment(String commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!comment.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        comment.setIsAvailable(false);
        commentRepository.save(comment);
    }

    public void reportComment(CommentReportRequest request) {
        Comment comment = commentRepository.findById(request.getCommentId())
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));

        kafkaTemplate.send(
                "create-report",
                ReportCreationEvent.builder()
                        .reportType("RENTAL_COMMENT")
                        .message(request.getMessage())
                        .itemId(request.getCommentId())
                        .userId(SecurityContextHolder.getContext().getAuthentication().getName())
                        .build()
        );
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public CommentResponse getComment(String commentId) {
        return commentRepository.findById(commentId)
                .map(comment -> {
                    UserResponse userResponse = userClient.getUserByUserId(comment.getUserId()).getResult();
                    Comment parentComment = null;
                    if (comment.getParentId() != null) {
                        parentComment = commentRepository.findById(comment.getParentId()).orElse(null);
                    }

                    CommentResponse parentCommentResponse = null;
                    if (parentComment != null) {
                        UserResponse parentUserResponse = userClient.getUserByUserId(parentComment.getUserId()).getResult();
                        parentCommentResponse = commentMapper.toCommentResponse(
                                parentComment,
                                parentUserResponse,
                                null
                        );
                    }

                    return commentMapper.toCommentResponse(
                            comment,
                            userResponse,
                            parentCommentResponse
                    );
                })
                .orElseThrow(() -> new AppException(ErrorCode.COMMENT_NOT_FOUND));
    }

    public ListResponse<CommentResponse> getAllComments(
            int pageNum,
            int pageSize,
            String postId
    ) {
        Sort sort = Sort.by(Sort.Direction.ASC, "createdAt");
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Comment> comments = commentRepository.findAllByPostId(postId, pageable);

        Map<String, UserResponse> userResponseCache = new HashMap<>();

        return ListResponse.<CommentResponse>builder()
                .data(comments.stream().map(comment -> {
                    Comment parentComment = null;
                    if (comment.getParentId() != null) {
                        parentComment = commentRepository.findById(comment.getParentId()).orElse(null);
                    }

                    UserResponse userResponse = userResponseCache.computeIfAbsent(
                            comment.getUserId(),
                            userId -> userClient.getUserByUserId(userId).getResult()
                    );

                    CommentResponse parentCommentResponse = null;
                    if (parentComment != null) {
                        UserResponse parentUserResponse = userResponseCache.computeIfAbsent(
                                parentComment.getUserId(),
                                userId -> userClient.getUserByUserId(userId).getResult()
                        );
                        parentCommentResponse = commentMapper.toCommentResponse(
                                parentComment,
                                parentUserResponse,
                                null
                        );
                    }

                    return commentMapper.toCommentResponse(
                            comment,
                            userResponse,
                            parentCommentResponse
                    );
                }).toList())
                .totalPage(comments.getTotalPages())
                .totalElement(comments.getTotalElements())
                .build();
    }

}
