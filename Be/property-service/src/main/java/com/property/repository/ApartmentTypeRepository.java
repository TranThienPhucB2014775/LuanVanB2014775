package com.property.repository;

import com.property.entity.ApartmentType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApartmentTypeRepository extends JpaRepository<ApartmentType, String> {
}
