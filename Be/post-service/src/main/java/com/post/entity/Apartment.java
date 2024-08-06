package com.post.entity;

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
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "apartments")
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID apartmentId;

    String city;
    String address;
    String rule;
    String utility;
    String description;
    Boolean isAvailable;

    @OneToMany
    @JoinColumn(name = "apartment_id")
    Set<AdditionalCost> additionalCosts;

    @ManyToOne
    @JoinColumn(name = "apartment_type_id")
    ApartmentType apartmentType;
}
