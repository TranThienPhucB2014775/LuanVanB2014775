package com.property.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.RoomTypeCreationRequest;
import com.property.dto.request.RoomTypeUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.RoomTypeResponse;
import com.property.service.RoomTypeService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/room-types")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomTypeController {

    RoomTypeService roomTypeService;

    @PostMapping
    public ResponseEntity<ApiResponse<RoomTypeResponse>> createRoom(@RequestBody RoomTypeCreationRequest request) {
        log.info("Creating room");

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.<RoomTypeResponse>builder()
                        .result(roomTypeService.createRoomType(request))
                        .build());
    }

    @PutMapping
    public ApiResponse<RoomTypeResponse> updateRoom(@RequestBody RoomTypeUpdateRequest request) {
        return ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeService.updateRoomType(request))
                .build();
    }

    @DeleteMapping("/{roomTypeId}")
    public ResponseEntity<?> deleteRoom(@PathVariable String roomTypeId) {
        log.info("Deleting room");

        roomTypeService.deleteRoomType(roomTypeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @PatchMapping("/{roomTypeId}/enable")
    public ResponseEntity<?> enableRoom(@PathVariable String roomTypeId) {
        log.info("Enabling room");

        roomTypeService.enableRoomType(roomTypeId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @GetMapping("/{roomTypeId}")
    public ApiResponse<?> getRoom(@PathVariable String roomTypeId) {
        log.info("Getting roommm");

        return ApiResponse.builder()
                .result(roomTypeService.getRoomType(roomTypeId))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListResponse<RoomTypeResponse>> getAllRooms(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) Boolean isAvailable,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(defaultValue = "", required = false) String apartmentId) {
        log.info("Getting all rooms");
        return ApiResponse.<ListResponse<RoomTypeResponse>>builder()
                .result(roomTypeService.getAllRoomTypes(
                        pageNum, pageSize, sortBy, order, search, isAvailable, userId, apartmentId))
                .build();
    }
}
