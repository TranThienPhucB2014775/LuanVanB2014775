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
@Table(name = "rooms",
        indexes = {
                @Index(name = "rooms_user_id_index", columnList = "userId"),
                @Index(name = "rooms_room_type_id_index", columnList = "roomTypeId")
        })
public class Room extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID roomId;

    UUID userId;

    UUID roomTypeId;

    Boolean isAvailable;
}
