// Contract.java
package com.property.entity;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "contract", indexes = {
        @Index(name = "idx_landlord_id_contract", columnList = "landlordId"),
        @Index(name = "idx_room_id_contract", columnList = "room_id"),
        @Index(name = "idx_is_available_contract", columnList = "isAvailable")
})
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
    @Column(columnDefinition = "TEXT")
    String description;

    Boolean isAvailable;
}
