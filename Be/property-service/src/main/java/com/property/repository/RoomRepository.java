package com.property.repository;

import com.property.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.property.entity.Room;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {

    @Query("SELECT r " + "FROM Room r "
            + "JOIN r.roomType rt "
            + "JOIN rt.apartment a "
            + "WHERE (:search IS NULL OR r.name LIKE %:search%) "
            + "  AND (:isAvailable IS NULL OR r.isAvailable = :isAvailable) "
            + "  AND (:rentStatus IS NULL OR r.rentStatus = :rentStatus) "
            + "  AND (:apartmentId IS NULL OR a.apartmentId = :apartmentId) "
            + "  AND (:apartmentName IS NULL OR a.name LIKE %:apartmentName%) "
            + "  AND (:roomTypeId IS NULL OR rt.roomTypeId = :roomTypeId) "
            + "  AND (:roomTypeName IS NULL OR rt.name LIKE %:roomTypeName%) "
            + "  AND (:userId IS NULL OR a.userId = :userId)")
    Page<Room> findRoomsWithDetails(
            @Param("search") String search,
            @Param("isAvailable") Boolean isAvailable,
            @Param("rentStatus") String rentStatus,
            @Param("apartmentId") String apartmentId,
            @Param("apartmentName") String apartmentName,
            @Param("roomTypeId") String roomTypeId,
            @Param("roomTypeName") String roomTypeName,
            @Param("userId") String userId,
            Pageable pageable);

    List<Room> findAllByRoomType(RoomType roomType);
}
