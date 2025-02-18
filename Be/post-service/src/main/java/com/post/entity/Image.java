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
@Table(name = "image", indexes = {
        @Index(name = "idx_post_id_image", columnList = "postId"),
        @Index(name = "idx_user_id_image", columnList = "userId")
})
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String imageId;

    String postId;

    String imageUrl;

    String userId;
}
