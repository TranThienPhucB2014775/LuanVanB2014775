package com.post.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "tenant_post")
public class TenantPost extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String tenantPostId;

    String userId;

    String title;

    String description;

    long price;

    String city;

    String district;

    String address;

    String ward;

    String tenantPostType;

    Boolean isAvailable;
}
