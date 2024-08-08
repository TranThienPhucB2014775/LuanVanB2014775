package com.post.repository;

import com.post.entity.SearchPost;
import org.hibernate.validator.constraints.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchPostRepository extends JpaRepository<SearchPost, UUID> {
}
