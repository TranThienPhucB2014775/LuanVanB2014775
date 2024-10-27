package com.property.repository;

import com.property.entity.Contract;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface ContractRepository extends JpaRepository<Contract, String> {

    @Query("SELECT c FROM Contract c WHERE c.landlordId = ?1 AND c.room.roomId = ?2 AND c.isAvailable = ?3")
    Optional<Contract> findByLandlordIdAndRoomIdAndIsAvailable(String landlordId, String roomId, Boolean isAvailable);

    @Query("SELECT c FROM Contract c WHERE c.room.roomId = ?1 AND c.isAvailable = ?2")
    Optional<Contract> findByRoomIdAndIsAvailable(String roomId, Boolean isAvailable);

    @Query("SELECT c FROM Contract c WHERE c.room.roomId = ?1 AND c.isAvailable = true")
    Optional<Contract> findByRoomId(String roomId);

    Optional<Contract> findByLandlordId(String landlordId);

    @Query("SELECT c FROM Contract c WHERE c.expectedEndDate BETWEEN :startDate AND :endDate and c.isAvailable = true")
    List<Contract> getUpcomingContracts(
            @Param("startDate") Instant startDate,
            @Param("endDate") Instant endDate
    );
}
