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
@Table(name = "user_verification_request", indexes = {
        @Index(name = "idx_user_id", columnList = "userId"),
        @Index(name = "idx_is_checked", columnList = "isChecked"),
        @Index(name = "idx_is_successful", columnList = "isSuccessful")
})
public class UserVerificationRequest extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String userVerificationRequestId;

    String userId;

    String cardId;

    String urlIdCardNumber;

    Boolean isChecked;

    Boolean isSuccessful;
    @Column(columnDefinition = "TEXT")
    String message;
}
