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
@Table(
        name = "book_marks"
)

public class Bookmark {

    @Id
    UUID bookMarkId;

    @Id
    UUID userId;

    @ManyToOne
    @JoinColumn(name = "rental_post_id")
    RentalPost rentalPost;
}
