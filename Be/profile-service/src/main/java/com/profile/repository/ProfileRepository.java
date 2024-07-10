package com.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.profile.entity.Profile;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, String> {}
