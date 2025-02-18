package com.property.entity;

import java.util.Set;

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
@Table(name = "apartment", indexes = {
        @Index(name = "idx_user_id_apartment", columnList = "userId"),
        @Index(name = "idx_city_apartment", columnList = "city"),
        @Index(name = "idx_is_available_apartment", columnList = "isAvailable")
})
public class Apartment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String apartmentId;

    String userId;

    String name;

    String city;
    String address;
    @Column(columnDefinition = "TEXT")
    String rule;
    @Column(columnDefinition = "TEXT")
    String utility;
    @Column(columnDefinition = "TEXT")
    String description;
    Boolean isAvailable;

    @OneToMany
    @JoinColumn(name = "apartment_id")
    Set<AdditionalCost> additionalCosts;

    @ManyToOne
    @JoinColumn(name = "apartment_type_name", referencedColumnName = "name")
    ApartmentType apartmentType;
}
