package com.property.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
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
@Table(
        name = "tenants",
        indexes = {
                @Index(name = "tenant_user_id_index", columnList = "user_id"),
                @Index(name = "tenant_room_id_index", columnList = "room_id")
        }
)
public class Tenant extends BaseEntity {
    @Id
    UUID userId;

    @Id
    UUID roomId;

    Boolean isPrimary;
}
