package com.property.repository;

import com.property.entity.AdditionalCost;
import com.property.entity.AdditionalCostType;
import com.property.entity.Apartment;
import com.property.entity.MonthlyUsage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdditionalCostTypeRepository extends JpaRepository<AdditionalCostType, String> {

}
