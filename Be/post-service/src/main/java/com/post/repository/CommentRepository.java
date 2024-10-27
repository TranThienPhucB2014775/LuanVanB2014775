package com.post.repository;

import com.post.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, String> {

    Page<Comment> findAllByPostId(String commentId, Pageable pageable);
}
