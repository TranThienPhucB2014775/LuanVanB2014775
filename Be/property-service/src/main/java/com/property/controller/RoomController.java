package com.property.controller;

import java.util.List;

import com.property.dto.request.AcceptInviteRequest;
import com.property.dto.request.InviteTenantToRoomRequest;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.RoomCreationRequest;
import com.property.dto.request.RoomUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.RoomResponse;
import com.property.repository.RoomRepository;
import com.property.service.RoomService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomController {

    RoomService roomService;
    private final RoomRepository roomRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<List<RoomResponse>>> createRoomType(
            @Valid @RequestBody RoomCreationRequest request) {
        log.info("Creating room type");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<List<RoomResponse>>builder()
                        .result(roomService.createRoom(request))
                        .build());
    }

    @PutMapping
    public ApiResponse<RoomResponse> updateRoomType(@Valid @RequestBody RoomUpdateRequest request) {
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.updateRoom(request))
                .build();
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity<?> deleteRoomType(@PathVariable("roomId") String roomId) {
        roomService.deleteRoom(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{roomId}/enable")
    public ResponseEntity<?> enableRoomType(@PathVariable("roomId") String roomId) {

        roomService.enableRoom(roomId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/{roomId}")
    public ApiResponse<RoomResponse> getRoomType(@PathVariable("roomId") String roomId) {
        log.info("Getting room type");
        return ApiResponse.<RoomResponse>builder()
                .result(roomService.getRoom(roomId))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListResponse<RoomResponse>> getAllRoomTypes(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "name", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) Boolean isAvailable,
            @RequestParam(defaultValue = "", required = false) String rentStatus,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(defaultValue = "", required = false) String apartmentId,
            @RequestParam(defaultValue = "", required = false) String apartmentName,
            @RequestParam(defaultValue = "", required = false) String roomTypeId,
            @RequestParam(defaultValue = "", required = false) String roomTypeName) {
        return ApiResponse.<ListResponse<RoomResponse>>builder()
                .result(roomService.getRooms(
                        pageNum,
                        pageSize,
                        sortBy,
                        order,
                        search,
                        isAvailable,
                        rentStatus,
                        apartmentId,
                        apartmentName,
                        roomTypeId,
                        roomTypeName,
                        userId))
                .build();
    }
}
