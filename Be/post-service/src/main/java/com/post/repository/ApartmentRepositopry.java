package com.post.repository;

import com.post.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ApartmentRepositopry extends JpaRepository<Apartment, UUID> {
}
