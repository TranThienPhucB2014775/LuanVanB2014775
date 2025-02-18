package com.property.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.property.dto.response.InvoiceUnpaidResponse;
import com.property.dto.response.TotalInvoiceResponse;
import com.property.entity.Invoice;
import com.property.entity.Room;

public interface InvoiceRepository extends JpaRepository<Invoice, String> {

    Optional<Invoice> findByMonthAndYearAndRoom(int month, int year, Room room);

    Optional<Invoice> findByRoom(Room room);

    @Query("SELECT COUNT(i) " +
            "FROM Invoice i " +
            "WHERE (i.year > ?2) OR (i.year = ?2 AND i.month > ?1) AND i.room = ?3")
    Long checkFutureInvoiceExists(int month, int year, Room room);


    @Query("SELECT SUM(i.totalUsage) FROM Invoice i WHERE i.contract.landlordId = :userId and i.isPaid = true")
    Optional<BigDecimal> findTotalIncomeByUserId(@Param("userId") String userId);

    @Query(
            "SELECT new com.property.dto.response.TotalInvoiceResponse(CAST(SUM(i.totalUsage) AS BigDecimal), i.month, i.year, null) " +
                    "FROM Invoice i WHERE i.contract.landlordId = :userId " +
                    "AND i.isPaid = true " +
                    "AND (:roomId IS NULL OR i.room.roomId = :roomId) " +
                    "AND (:roomTypeId IS NULL OR i.room.roomType.roomTypeId = :roomTypeId) " +
                    "AND (:apartmentId IS NULL OR i.room.roomType.apartment.apartmentId = :apartmentId) " +
                    "GROUP BY i.month, i.year ORDER BY i.year ASC, i.month ASC"
    )
    List<TotalInvoiceResponse> findTotalInvoiceResponsesForLast6Months(
            @Param("userId") String userId,
            @Param("roomId") String roomId,
            @Param("roomTypeId") String roomTypeId,
            @Param("apartmentId") String apartmentId,
            Pageable pageable
    );

    @Query(
            "SELECT new com.property.dto.response.TotalInvoiceResponse(CAST(SUM(i.totalUsage) AS BigDecimal), i.month, i.year, null) " +
                    "FROM Invoice i WHERE i.contract.landlordId = :userId " +
                    "AND i.isPaid = true " +
                    "AND (:roomId IS NULL OR i.room.roomId = :roomId) " +
                    "AND (:roomTypeId IS NULL OR i.room.roomType.roomTypeId = :roomTypeId) " +
                    "AND (:apartmentId IS NULL OR i.room.roomType.apartment.apartmentId = :apartmentId) " +
                    "AND (i.year > :startYear OR (i.year = :startYear AND i.month >= :startMonth)) " +
                    "GROUP BY i.month, i.year ORDER BY i.year ASC , i.month ASC"
    )
    List<TotalInvoiceResponse> findTotalInvoiceResponsesFromStartMonth(
            @Param("userId") String userId,
            @Param("startMonth") int startMonth,
            @Param("startYear") int startYear,
            @Param("roomId") String roomId,
            @Param("roomTypeId") String roomTypeId,
            @Param("apartmentId") String apartmentId,
            Pageable pageable
    );

    @Query("SELECT CAST(SUM(i.totalUsage) AS BigDecimal) " + "FROM Invoice i WHERE i.contract.landlordId = :userId "
            + "AND (:month IS NULL OR i.month = :month) "
            + "AND (:year IS NULL OR i.year = :year) "
            + "AND i.isPaid = true"
    )
    Optional<BigDecimal> findTotalByMonthYearAndUserId(
            @Param("userId") String userId, @Param("month") Integer month, @Param("year") Integer year);

    //    @Query("SELECT i FROM Invoice i WHERE i.room.roomId = :roomId and i.isPaid = false ORDER BY
    // ABS(YEAR(CURRENT_DATE) - i.year) * 12 + ABS(MONTH(CURRENT_DATE) - i.month) ASC")
    //    List<Invoice> findClosestInvoicesByRoomId(@Param("roomId") String roomId);

    @Query(
            "SELECT i FROM Invoice i WHERE i.room.roomId = :roomId and i.isPaid = false ORDER BY i.year DESC, i.month DESC")
    List<Invoice> findClosestInvoicesByRoomId(@Param("roomId") String roomId);

    @Query("SELECT new com.property.dto.response.InvoiceUnpaidResponse(COUNT(i), SUM(i.totalUsage)) "
            + "FROM Invoice i "
            + "WHERE i.contract.landlordId = :landlordId "
            + "AND i.isPaid = false "
            + "AND (:apartmentId IS NULL OR i.room.roomType.apartment.apartmentId = :apartmentId) "
            + "AND (:roomTypeId IS NULL OR i.room.roomType.roomTypeId = :roomTypeId) "
            + "AND (:roomId IS NULL OR i.room.roomId = :roomId)")
    InvoiceUnpaidResponse countUnpaidInvoices(
            @Param("landlordId") String landlordId,
            @Param("apartmentId") String apartmentId,
            @Param("roomTypeId") String roomTypeId,
            @Param("roomId") String roomId);
}
