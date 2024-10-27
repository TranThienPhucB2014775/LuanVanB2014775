package com.property.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.property.entity.Apartment;

@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, String>, JpaSpecificationExecutor<Apartment> {

    //    @Query("SELECT a FROM Apartment a " +
    //            "WHERE (:search IS NULL OR " +
    //            "LOWER(a.address) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
    //            "LOWER(a.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
    //            "LOWER(a.rule) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
    //            "LOWER(a.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
    //            "LOWER(a.utility) LIKE LOWER(CONCAT('%', :search, '%'))) " +
    //            "AND (:isAvailable IS NULL OR a.isAvailable = :isAvailable) " +
    //            "AND (:city IS NULL OR :city = '' OR LOWER(a.city) = LOWER(:city))" +
    //            "AND (:userId IS NULL OR :userId = '' OR a.userId = :userId)" +
    //            "AND (:apartmentType IS NULL OR :apartmentType = '' OR a.apartmentType.name = :apartmentType)")
    //    Page<Apartment> findAllApartments(
    //            @Param("search") String search,
    //            @Param("isAvailable") Boolean isAvailable,
    //            @Param("city") String city,
    //            @Param("userId") String userId,
    //            @Param("apartmentType") String apartmentType,
    //            Pageable pageable);

    List<Apartment> findByUserId(String userId);
}
