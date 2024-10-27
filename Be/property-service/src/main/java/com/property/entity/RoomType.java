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
@Table(name = "room_type")
@ToString
public class RoomType extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String roomTypeId;

    @ManyToOne
    @JoinTable(
            name = "room_type_apartment",
            joinColumns = @JoinColumn(name = "room_type_id"),
            inverseJoinColumns = @JoinColumn(name = "apartment_id"))
    @Lazy
    Apartment apartment;

    String name;
    String description;
    String info;
    String utility;
    Boolean isAvailable;
    int maxOccupancy;
}
