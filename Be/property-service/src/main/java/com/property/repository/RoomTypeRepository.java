package com.property.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.property.entity.Apartment;
import com.property.entity.RoomType;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, String>, JpaSpecificationExecutor<RoomType> {

    @Query("SELECT r FROM RoomType r " + "join r.apartment a "
            + "WHERE (:search IS NULL OR "
            + "LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR "
            + "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')) OR "
            + "LOWER(r.utility) LIKE LOWER(CONCAT('%', :search, '%')) OR "
            + "LOWER(r.info) LIKE LOWER(CONCAT('%', :search, '%')))"
            + "AND (:isAvailable IS NULL OR r.isAvailable = :isAvailable) "
            + "AND (:userId IS NULL OR r.apartment.userId = :userId)"
            + "AND (:apartmentId IS NULL OR r.apartment.apartmentId = :apartmentId)")
    Page<RoomType> findAllRoomTypes(
            @Param("search") String search,
            @Param("isAvailable") Boolean isAvailable,
            @Param("userId") String userId,
            @Param("apartmentId") String apartmentId,
            Pageable pageable);

    List<RoomType> findAllByApartment(Apartment apartment);

    @Query("SELECT COUNT(r) FROM RoomType r WHERE r.apartment.userId = :userId")
    long countAllByUserId(String userId);
}
