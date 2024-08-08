package com.post.repository;

import com.post.entity.RentalPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RentalPostRepositopry extends JpaRepository<RentalPost, UUID> {
}
