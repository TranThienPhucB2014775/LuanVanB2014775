package com.property.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.property.entity.AdditionalCost;
import com.property.entity.Apartment;

@Repository
public interface AdditionalCostRepository extends JpaRepository<AdditionalCost, String> {

    @Query("SELECT ac FROM AdditionalCost ac WHERE ac.apartment = :apartment AND ac.isAvailable = true "
            + "and ac.additionalCostId NOT IN "
            + "(SELECT mu.additionalCost.additionalCostId FROM MonthlyUsage mu WHERE mu.roomId = :roomId "
            + "AND mu.month = :month AND mu.year = :year)")
    List<AdditionalCost> findUnrecordedAdditionalCosts(Apartment apartment, String roomId, int month, int year);
}
