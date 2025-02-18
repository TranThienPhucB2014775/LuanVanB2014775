package com.property.entity;

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
@Table(name = "room", indexes = {
        @Index(name = "idx_is_available_room", columnList = "isAvailable"),
        @Index(name = "idx_rent_status_room", columnList = "rentStatus")
})
public class Room extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String roomId;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    RoomType roomType;

    String name;

    Boolean isAvailable;

    String rentStatus;

    int currentOccupancy;
}
