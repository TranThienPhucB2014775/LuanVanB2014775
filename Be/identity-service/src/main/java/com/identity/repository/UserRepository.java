package com.identity.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.identity.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Page<User> findByEnabled(boolean isEnable, Pageable pageable);

    Page<User> findByEmailContaining(String email, Pageable pageable);

    Page<User> findByEmailContainingAndEnabled(String email, boolean isEnable, Pageable pageable);

    @Query(
            "SELECT u FROM User u WHERE (:search IS NULL OR u.email LIKE %:search%) AND (:isEnable IS NULL OR u.enabled = :isEnable)")
    Page<User> findByEmailContainingAndEnabled(
            @Param("search") String search, @Param("isEnable") Boolean isEnable, Pageable pageable);
}
