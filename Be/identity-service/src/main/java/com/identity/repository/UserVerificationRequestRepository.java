package com.identity.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.identity.entity.UserVerificationRequest;

public interface UserVerificationRequestRepository
        extends JpaRepository<UserVerificationRequest, String>, JpaSpecificationExecutor<UserVerificationRequest> {

    Optional<UserVerificationRequest> findByUserId(String userId);
}
