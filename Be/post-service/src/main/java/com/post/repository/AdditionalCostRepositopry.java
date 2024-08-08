package com.post.repository;

import com.post.entity.AdditionalCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AdditionalCostRepositopry extends JpaRepository<AdditionalCost, UUID> {
}
