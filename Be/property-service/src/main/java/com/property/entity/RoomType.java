package com.property.entity;

import jakarta.persistence.*;

import org.springframework.context.annotation.Lazy;

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
@Table(name = "room_type", indexes = {
        @Index(name = "idx_is_available_room_type", columnList = "isAvailable")
})
@ToString
public class RoomType extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String roomTypeId;

    @ManyToOne
    @JoinColumn(name = "apartment_id")
    Apartment apartment;

    String name;
    @Column(columnDefinition = "TEXT")
    String description;
    @Column(columnDefinition = "TEXT")
    String info;
    @Column(columnDefinition = "TEXT")
    String utility;
    Boolean isAvailable;
    int maxOccupancy;
}
