package com.interact.entity;

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
@Table(name = "feed_back", indexes = {
        @Index(name = "idx_is_available_feed_back", columnList = "isAvailable"),
        @Index(name = "idx_user_id_feed_back", columnList = "userId") // New index
})
public class FeedBack extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "feed_back_id")
    String id;

    String itemId;

    String feedBackType;

    int rating;

    String userId;
    @Column(columnDefinition = "TEXT")
    String feedBack;

    Boolean isAvailable;
    int updateLimit;
}
