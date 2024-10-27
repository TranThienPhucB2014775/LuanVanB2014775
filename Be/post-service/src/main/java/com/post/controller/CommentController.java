package com.post.controller;

import com.post.dto.ApiResponse;
import com.post.dto.request.CommentCreationRequest;
import com.post.dto.request.CommentReportRequest;
import com.post.dto.request.CommentUpdateRequest;
import com.post.dto.response.CommentResponse;
import com.post.dto.response.ListResponse;
import com.post.service.CommentService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CommentController {

    CommentService commentService;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createComment(
            @RequestBody @Valid CommentCreationRequest request
    ) {
        log.info("Comment created");
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.builder()
                        .result(commentService.createComment(request))
                        .build()
                );
    }

    @PostMapping("/report")
    public ApiResponse<?> reportComment(
            @RequestBody @Valid CommentReportRequest request
    ) {
        log.info("Comment reported");

        commentService.reportComment(request);

        return ApiResponse.builder()
                .result("Comment reported")
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateComment(
            @RequestBody @Valid CommentUpdateRequest request
    ) {
        return ApiResponse.builder()
                .result(commentService.updateComment(request))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListResponse<CommentResponse>> getAllComments(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = true) String postId
    ) {
        return ApiResponse.<ListResponse<CommentResponse>>builder()
                .result(commentService.getAllComments(pageNum, pageSize, postId))
                .build();
    }

    @GetMapping("/{commentId}")
    public ApiResponse<CommentResponse> getComment(
            @PathVariable String commentId
    ) {
        return ApiResponse.<CommentResponse>builder()
                .result(commentService.getComment(commentId))
                .build();
    }

    @DeleteMapping("/{commentId}")
    public ApiResponse<String> deleteComment(
            @PathVariable String commentId
    ) {
        log.info("Comment deleted with id: {}", commentId);
        commentService.deleteComment(commentId);
        return ApiResponse.<String>builder()
                .result("Comment deleted successfully")
                .build();
    }
}
