package com.post.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.post.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, String> {

    Page<Comment> findAllByPostId(String commentId, Pageable pageable);

    long countAllByPostId(String postId);
}
