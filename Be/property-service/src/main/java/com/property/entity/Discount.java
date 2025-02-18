package com.property.entity;

import java.math.BigDecimal;

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
@Table(name = "discount", indexes = {
        @Index(name = "idx_name_discount", columnList = "name"),
        @Index(name = "idx_active_discount", columnList = "active")
})
public class Discount {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String discountId;

    String name;

    String description;

    BigDecimal discount;

    String unit;

    boolean active;
}
