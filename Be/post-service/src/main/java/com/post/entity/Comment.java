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
@Table(name = "comment", indexes = {
        @Index(name = "idx_post_id", columnList = "postId"),
        @Index(name = "idx_user_id_comment", columnList = "userId"),
        @Index(name = "idx_is_available_comment", columnList = "isAvailable")
})
@ToString
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String commentId;

    String postId;

    String userId;
    @Column(columnDefinition = "TEXT")
    String content;

    String parentId;

    Boolean isAvailable;

    long page;
}
