package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "discount")
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
