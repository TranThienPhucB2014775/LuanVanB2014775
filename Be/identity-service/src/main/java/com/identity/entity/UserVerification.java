package com.identity.entity;

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
@Table(name = "user_verification", indexes = {
        @Index(name = "idx_userVerification_id", columnList = "userVerificationId")
})
public class UserVerification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String userVerificationId;

    String userId;

    String cardId;

    String urlCardId;
}
