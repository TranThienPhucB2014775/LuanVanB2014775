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
@Table(name = "comment", indexes = {})
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String commentId;

    String postId;

    String userId;

    String content;

    String parentId;

    Boolean isAvailable;
}
