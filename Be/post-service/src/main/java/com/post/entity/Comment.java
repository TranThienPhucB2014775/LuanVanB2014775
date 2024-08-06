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
@Table(name = "rental_posts", indexes = {
        @Index(name = "rental_posts_user_id_index", columnList = "user_id")
})
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID commentId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    RentalPost rentalPost;

    UUID userId;

    String content;
    Boolean isAvailable;
}
