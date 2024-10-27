package com.identity.repository;

import com.identity.entity.UserVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserVerificationRepository extends JpaRepository<UserVerification, String> {
    Boolean existsByUserId(String userId);

    Optional<UserVerification> findByUserId(String userId);

    Optional<UserVerification> findByUrlCardId(String urlCardId);
}
