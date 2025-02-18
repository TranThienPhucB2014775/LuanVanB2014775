package com.identity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.identity.entity.UserVerification;

public interface UserVerificationRepository extends JpaRepository<UserVerification, String> {
    Boolean existsByUserId(String userId);

    Optional<UserVerification> findByUserId(String userId);

    Optional<UserVerification> findByUrlCardId(String urlCardId);
}
