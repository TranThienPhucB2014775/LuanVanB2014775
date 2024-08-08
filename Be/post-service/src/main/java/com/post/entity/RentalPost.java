package com.post.entity;

import jakarta.persistence.*;
import jakarta.persistence.Table;
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
@Table(name = "rental_posts",
        indexes = {
                @Index(name = "rental_posts_user_id_index", columnList = "user_id")
        })
public class RentalPost extends BaseEntity {
    @Id
    UUID RentalPostId;

    UUID userId;

    String title;
    String description;
    String isAvailable;

    @OneToMany
    @JoinColumn(name = "rental_post_id")
    Set<Image> images;

    @OneToMany
    @JoinColumn(name = "rental_post_id")
    Set<Comment> comment;

    @OneToMany
    @JoinColumn(name = "rental_post_id")
    Set<Bookmark> bookmark;
}
