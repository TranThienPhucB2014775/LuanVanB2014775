package com.post.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.post.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, String> {
    List<Image> findByPostId(String postId);
}
