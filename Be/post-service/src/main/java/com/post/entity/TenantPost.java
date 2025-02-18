package com.post.entity;

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
@Table(name = "tenant_post", indexes = {
        @Index(name = "idx_user_id_tenant_post", columnList = "userId"),
        @Index(name = "idx_city_tenant_post", columnList = "city"),
        @Index(name = "idx_district_tenant_post", columnList = "district"),
        @Index(name = "idx_ward_tenant_post", columnList = "ward"),
        @Index(name = "idx_is_available_tenant_post", columnList = "isAvailable")
})
public class TenantPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String tenantPostId;

    String userId;
    @Column(columnDefinition = "TEXT")
    String title;
    @Column(columnDefinition = "TEXT")
    String description;

    long price;

    String city;

    String district;

    String address;

    String ward;

    String tenantPostType;

    Boolean isAvailable;
}
