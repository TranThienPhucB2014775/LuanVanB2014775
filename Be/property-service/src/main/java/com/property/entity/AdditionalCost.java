package com.property.entity;

import java.math.BigDecimal;
import java.util.Set;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "additional_cost")
public class AdditionalCost extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String additionalCostId;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    Apartment apartment;

    String name;

    String unit;

    BigDecimal cost;

    Boolean isAvailable;

    @OneToMany
    Set<MonthlyUsage> monthlyUsages;

    @ManyToOne
    @JoinTable(
            name = "additional_cost_additional_cost_type",
            joinColumns = @JoinColumn(name = "additional_cost_id"),
            inverseJoinColumns = @JoinColumn(name = "additional_cost_type_id"))
    AdditionalCostType additionalCostType;
}
