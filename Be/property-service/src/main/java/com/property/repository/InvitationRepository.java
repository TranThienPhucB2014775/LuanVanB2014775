package com.property.repository;

import com.property.entity.Invitation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface InvitationRepository extends JpaRepository<Invitation, String>, JpaSpecificationExecutor<Invitation> {

    Optional<Invitation> findByInviteToken(String inviteToken);

    Page<Invitation> findByTenantId(String tenantId, Pageable pageable);
}
