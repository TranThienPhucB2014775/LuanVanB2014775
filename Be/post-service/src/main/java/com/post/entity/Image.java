package com.post.entity;

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
@Table(name = "images")
public class Image extends BaseEntity {

    @Id
    UUID imageId;

    String name;

    @ManyToOne
    @JoinColumn(name = "rental_post_id")
    RentalPost rentalPost;
}
