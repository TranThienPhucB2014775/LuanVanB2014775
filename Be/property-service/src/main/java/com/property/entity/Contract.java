// Contract.java
package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "contract")
public class Contract extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String contractId;

    Instant startDate;

    Instant expectedEndDate;

    Instant actualEndDate;

    BigDecimal price;

    String landlordId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    BigDecimal depositAmount;

    String description;

    Boolean isAvailable;
}