package com.post.entity;

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
        name = "rental_posts",
        indexes = {@Index(name = "rental_posts_user_id_index", columnList = "user_id")}
)

public class Bookmark {

    @Id
    UUID bookMarkId;

    @Id
    UUID userId;

    @Id
    UUID rentalPostId;
}
