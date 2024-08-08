package com.post.repository;

import com.post.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoomRepositopry extends JpaRepository<Room, UUID> {
}
