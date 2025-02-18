package com.property.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.property.entity.Invitation;

public interface InvitationRepository extends JpaRepository<Invitation, String>, JpaSpecificationExecutor<Invitation> {

    Optional<Invitation> findByInviteToken(String inviteToken);

    Page<Invitation> findByTenantId(String tenantId, Pageable pageable);
}
