package com.identity.repository;

import com.identity.entity.UserVerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserVerificationRequestRepository extends JpaRepository<UserVerificationRequest, String>,
        JpaSpecificationExecutor<UserVerificationRequest> {

    Optional<UserVerificationRequest> findByUserId(String userId);
}
