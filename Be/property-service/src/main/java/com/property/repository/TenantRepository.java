package com.property.repository;

import com.property.entity.Contract;
import com.property.entity.Tenant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TenantRepository extends JpaRepository<Tenant, String>, JpaSpecificationExecutor<Tenant> {


    Page<Tenant> findByTenantIdAndIsAvailable(String tenantId, Boolean isAvailable, Pageable pageable);

    Page<Tenant> findByContract(Contract contract, Pageable pageable);

    List<Tenant> findByContractAndIsAvailable(Contract contract, boolean isAvailable);


    @Query("SELECT t FROM Tenant t WHERE t.contract.room.roomId = :roomId and t.isAvailable = true")
    List<Tenant> findALlTenantByRoomIdAndIsAAndIsAvailableTrue(@Param("roomId") String roomId);

    @Query("SELECT t FROM Tenant t WHERE t.contract.room.roomId = :roomId and t.isAvailable = :isAvailable")
    Page<Tenant> findAllTenants(
            @Param("roomId") String roomId,
            @Param("isAvailable") Boolean isAvailable,
//            @Param("landlordId") String landlordId,
            Pageable pageable
    );

    Page<Tenant> findTenantByTenantIdAndIsAvailable(String tenantId, boolean isAvailable, Pageable pageable);

    @Query("SELECT t FROM Tenant t " +
            "WHERE t.tenantId = :tenantId " +
            "and t.contract.room.roomId = :roomId " +
            "and t.isAvailable = true"
    )
    Optional<Tenant> findTenantByTenantIdAndRoomId(
            @Param("tenantId") String tenantId,
            @Param("roomId") String roomId
    );

//    @Query(value = "SELECT t.* " +
//            "FROM tenant t " +
//            "JOIN contract_details c ON t.contract_contract_id = c.contract_id " +
//            "JOIN room r ON c.room_id = r.room_id " +
//            "JOIN room_type rt ON r.room_type_id = rt.room_type_id " +
//            "JOIN apartments a ON rt.apartment_id = a.apartment_id " +
//            "WHERE a.apartment_id = :apartmentId ", nativeQuery = true)
//    List<Tenant> findByApartmentId(@Param("apartmentId") String apartmentId);

    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN TRUE ELSE FALSE END " +
            "FROM Tenant t " +
            "WHERE t.tenantId = :tenantId " +
            "AND t.contract.landlordId = :landlordId " +
            "AND t.isAvailable = true")
    boolean existsByTenantIdAndLandlordId(
            @Param("tenantId") String tenantId,
            @Param("landlordId") String landlordId
    );

    // In TenantRepository.java
    @Query("SELECT t FROM Tenant t " +
            "JOIN t.contract c " +
            "JOIN c.room r " +
            "JOIN r.roomType rt " +
            "JOIN rt.apartment a " +
            "WHERE a.apartmentId = :apartmentId")
    List<Tenant> findByApartmentId(@Param("apartmentId") String apartmentId);
}
