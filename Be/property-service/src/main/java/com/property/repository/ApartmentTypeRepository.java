package com.property.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.property.entity.ApartmentType;

public interface ApartmentTypeRepository extends JpaRepository<ApartmentType, String> {}
