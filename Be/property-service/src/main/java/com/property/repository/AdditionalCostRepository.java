package com.property.repository;


import com.property.entity.AdditionalCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AdditionalCostRepository extends JpaRepository<AdditionalCost, UUID> {
}
