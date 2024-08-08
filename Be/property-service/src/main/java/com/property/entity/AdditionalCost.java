package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "additional_costs")
public class AdditionalCost extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID additionalCostId;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    Apartment apartment;

    String name;

    String cost;
    String unit;
}
