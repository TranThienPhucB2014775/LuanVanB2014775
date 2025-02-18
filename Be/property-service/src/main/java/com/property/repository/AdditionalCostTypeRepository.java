package com.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.property.entity.AdditionalCostType;

@Repository
public interface AdditionalCostTypeRepository extends JpaRepository<AdditionalCostType, String> {}
