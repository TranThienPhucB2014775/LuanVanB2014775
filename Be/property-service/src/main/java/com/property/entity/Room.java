package com.property.entity;

import jakarta.persistence.*;

import org.springframework.context.annotation.Lazy;

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
@Table(name = "room")
public class Room extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String roomId;

    @ManyToOne
    @JoinTable(
            name = "room_room_type",
            joinColumns = @JoinColumn(name = "room_id"),
            inverseJoinColumns = @JoinColumn(name = "room_type_id"))
    RoomType roomType;

    String name;

    Boolean isAvailable;

    String rentStatus;

    int currentOccupancy;
}
