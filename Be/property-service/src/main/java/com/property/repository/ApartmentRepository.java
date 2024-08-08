package com.property.repository;

import com.property.entity.Apartment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, String> {

    @Query("SELECT a FROM Apartment a " +
            "WHERE (:search IS NULL OR " +
            "LOWER(a.address) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(a.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(a.rule) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(a.utility) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (:isAvailable IS NULL OR a.isAvailable = :isAvailable) " +
            "AND (:city IS NULL OR :city = '' OR LOWER(a.city) = LOWER(:city))"+
            "AND (:userId IS NULL OR :userId = '' OR a.userId = :userId)")
    Page<Apartment> findAllApartments(
            @Param("search") String search,
            @Param("isAvailable") Boolean isAvailable,
            @Param("city") String city,
            @Param("userId") String userId,
            Pageable pageable);

    List<Apartment> findByUserId(String userId);
}
