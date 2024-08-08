package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "apartments")
public class Apartment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String apartmentId;

    String userId;

    String city;
    String address;
    String rule;
    String utility;
    String description;
    Boolean isAvailable;

    @OneToMany
    @JoinColumn(name = "apartment_id")
    Set<AdditionalCost> additionalCosts;

    @OneToMany
    @JoinColumn(name = "apartment_id")
    Set<Room> rooms;

    @ManyToOne
    ApartmentType apartmentType;
}
