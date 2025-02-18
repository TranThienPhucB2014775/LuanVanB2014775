package com.property.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.property.dto.response.TotalTenantResponse;
import com.property.entity.Contract;
import com.property.entity.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, String>, JpaSpecificationExecutor<Tenant> {

    Page<Tenant> findByTenantIdAndIsAvailable(String tenantId, Boolean isAvailable, Pageable pageable);

    Page<Tenant> findByContract(Contract contract, Pageable pageable);

    List<Tenant> findByContractAndIsAvailable(Contract contract, boolean isAvailable);

    List<Tenant> findByContractAndTenantId(Contract contract, String tenantId);

    @Query("SELECT DISTINCT t FROM Tenant t WHERE t.contract.room.roomId = :roomId and t.isAvailable = true")
    List<Tenant> findALlTenantByRoomIdAndIsAAndIsAvailableTrue(@Param("roomId") String roomId);

    @Query("SELECT t FROM Tenant t WHERE t.contract.room.roomId = :roomId and t.isAvailable = :isAvailable")
    Page<Tenant> findAllTenants(
            @Param("roomId") String roomId,
            @Param("isAvailable") Boolean isAvailable,
            //            @Param("landlordId") String landlordId,
            Pageable pageable);

    Page<Tenant> findTenantByTenantIdAndIsAvailable(String tenantId, boolean isAvailable, Pageable pageable);

    @Query("SELECT t FROM Tenant t " + "WHERE t.tenantId = :tenantId "
            + "and t.contract.room.roomId = :roomId "
            + "and t.isAvailable = true")
    Optional<Tenant> findTenantByTenantIdAndRoomId(@Param("tenantId") String tenantId, @Param("roomId") String roomId);

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END " + "FROM Tenant t "
            + "WHERE t.tenantId = :tenantId "
            + "AND t.contract.landlordId = :landlordId "
            + "AND t.isAvailable = true")
    boolean existsByTenantIdAndLandlordId(@Param("tenantId") String tenantId, @Param("landlordId") String landlordId);

    // In TenantRepository.java
    @Query("SELECT t FROM Tenant t " + "JOIN t.contract c "
            + "JOIN c.room r "
            + "JOIN r.roomType rt "
            + "JOIN rt.apartment a "
            + "WHERE a.apartmentId = :apartmentId")
    List<Tenant> findByApartmentId(@Param("apartmentId") String apartmentId);

    @Query("SELECT DISTINCT t.tenantId " + "FROM Tenant t "
            + "JOIN t.contract c "
            + "JOIN c.room r "
            + "JOIN r.roomType rt "
            + "JOIN rt.apartment a "
            + "WHERE a.apartmentId = :apartmentId "
            + "AND t.isAvailable = :isAvailable")
    List<String> findByApartmentId(@Param("apartmentId") String apartmentId, Boolean isAvailable);

    @Query("SELECT DISTINCT t.tenantId FROM Tenant t WHERE t.contract.room.roomId = :roomId and t.isAvailable = true")
    List<String> findByRoomId(@Param("roomId") String roomId);

    @Query("SELECT DISTINCT t.tenantId FROM Tenant t WHERE t.contract.landlordId = :landlordId")
    List<String> findByLandlordId(String landlordId);

    @Query("SELECT DISTINCT t.tenantId FROM Tenant t " + "JOIN t.contract c "
            + "JOIN c.room r "
            + "JOIN r.roomType rt "
            + "WHERE rt.roomTypeId = :roomTypeId "
            + "AND t.isAvailable = :isAvailable")
    List<String> findByRoomTypeId(@Param("roomTypeId") String roomTypeId, Boolean isAvailable);

    @Query("SELECT COUNT(t) FROM Tenant t " + "JOIN t.contract c "
            + "JOIN c.room r "
            + "JOIN r.roomType rt "
            + "JOIN rt.apartment a "
            + "WHERE (:apartmentId IS NULL OR a.apartmentId = :apartmentId) "
            + "AND (:roomTypeId IS NULL OR rt.roomTypeId = :roomTypeId) "
            + "AND (:userId IS NULL OR c.landlordId = :userId) "
            + "AND c.isAvailable = true "
    )
    int countTenantsByApartmentIdOrRoomTypeIdAndUserIdAndContractIsAvailable(
            @Param("apartmentId") String apartmentId,
            @Param("roomTypeId") String roomTypeId,
            @Param("userId") String userId);

    @Query(
            value = "select count(DISTINCT  tenant_id) " + "from tenant " + "where is_available = true",
            nativeQuery = true)
    long countAllTenant();

    @Query("SELECT new com.property.dto.response.TotalTenantResponse(MONTH(t.endDate), YEAR(t.endDate), COUNT(t)) "
            + "FROM Tenant t "
            + "JOIN t.contract c "
            + "JOIN c.room r "
            + "JOIN r.roomType rt "
            + "JOIN rt.apartment a "
            + "WHERE (:apartmentId IS NULL OR a.apartmentId = :apartmentId) "
            + "AND (:roomTypeId IS NULL OR rt.roomTypeId = :roomTypeId) "
            + "AND (:roomId IS NULL OR r.roomId = :roomId) "
            + "AND (:userId IS NULL OR t.tenantId = :userId) "
            + "AND t.endDate IS NOT NULL "
            + "GROUP BY YEAR(t.endDate), MONTH(t.endDate) "
            + "ORDER BY YEAR(t.endDate) DESC, MONTH(t.endDate) DESC")
    List<TotalTenantResponse> countTenantsLast12Months(
            @Param("apartmentId") String apartmentId,
            @Param("roomTypeId") String roomTypeId,
            @Param("roomId") String roomId,
            @Param("userId") String userId);
}
