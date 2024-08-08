package com.post.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "search_posts")
public class SearchPost extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID searchPostId;

    UUID userId;

    String title;
    String description;
    BigDecimal budget;
    String location;

}
