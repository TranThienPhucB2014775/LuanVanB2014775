package com.property.repository;

import com.property.entity.AdditionalCost;
import com.property.entity.MonthlyUsage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MonthlyUsageRepository extends JpaRepository<MonthlyUsage, String> {

    Optional<MonthlyUsage> findByRoomIdAndYearAndMonthAndAdditionalCost(
            String roomId,
            int year,
            int month,
            AdditionalCost additionalCost);



}
