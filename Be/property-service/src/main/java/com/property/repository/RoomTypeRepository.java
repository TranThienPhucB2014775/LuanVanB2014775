package com.property.repository;

import com.property.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, String> {

    @Query("SELECT r FROM RoomType r " +
            "WHERE (:search IS NULL OR " +
            "LOWER(r.name) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(r.description) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(r.utility) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(r.info) LIKE LOWER(CONCAT('%', :search, '%')))" +
            "AND (:isAvailable IS NULL OR r.isAvailable = :isAvailable) "
    )
    Page<RoomType> findAllRoomTypes(
            @Param("search") String search,
            @Param("isAvailable") Boolean isAvailable,
            Pageable pageable
    );
}
