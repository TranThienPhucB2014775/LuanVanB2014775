package com.property.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.property.entity.AdditionalCost;
import com.property.entity.MonthlyUsage;

public interface MonthlyUsageRepository extends JpaRepository<MonthlyUsage, String> {

    Optional<MonthlyUsage> findByRoomIdAndYearAndMonthAndAdditionalCost(
            String roomId, int year, int month, AdditionalCost additionalCost);

    List<MonthlyUsage> findByRoomIdAndAdditionalCost(String roomId, AdditionalCost additionalCost);
}
