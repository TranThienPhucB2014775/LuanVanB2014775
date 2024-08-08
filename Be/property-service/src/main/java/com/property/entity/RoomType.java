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
@Table(name = "room_types",
        indexes = {
                @Index(name = "room_type_id_index", columnList = "room_type_id"),
                @Index(name = "apartment_id_index", columnList = "apartment_id")
        })
public class RoomType extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String roomTypeId;

    @ManyToOne
    @JoinColumn(name = "apartment_id", nullable = false)
    Apartment apartment;

    String name;
    String description;
    String info;
    String utility;
    Boolean isAvailable;
}
