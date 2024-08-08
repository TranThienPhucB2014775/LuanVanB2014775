package com.post.controller;

import com.post.service.RoomService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apartment")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomController {

    RoomService roomService;

    @PostMapping
    public void createRoom() {
        log.info("Creating room");
        roomService.createRoom();
    }

    @PutMapping
    public void updateRoom() {
        log.info("Updating room");
        roomService.updateRoom();
    }

    @DeleteMapping
    public void deleteRoom() {
        log.info("Deleting room");
        roomService.deleteRoom();
    }

    @GetMapping
    public void getRoom() {
        log.info("Getting room");
        roomService.getRoom();
    }

    @GetMapping("/all")
    public void getAllRooms() {
        log.info("Getting all rooms");
        roomService.getAllRooms();
    }
}
