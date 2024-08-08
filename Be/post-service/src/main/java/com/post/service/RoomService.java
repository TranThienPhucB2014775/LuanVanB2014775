package com.post.service;

import com.post.repository.RoomRepositopry;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomService {

    RoomRepositopry roomRepositopry;

    public void createRoom() {
        log.info("Create room");
    }

    public void deleteRoom() {
        log.info("Delete room");
    }

    public void updateRoom() {
        log.info("Update room");
    }

    public void getRoom() {
        log.info("Get room");
    }

    public void getAllRooms() {
        log.info("Get all rooms");
    }

    public void getRoomByUser() {
        log.info("Get room by user");
    }
}
