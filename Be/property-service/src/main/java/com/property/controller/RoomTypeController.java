package com.property.controller;

import com.property.dto.ApiResponse;
import com.property.dto.request.roomTypeCreationRequest;
import com.property.dto.request.roomTypeUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.RoomTypeResponse;
import com.property.service.RoomTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room-types")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomTypeController {

    RoomTypeService roomTypeService;

    @PostMapping
    public ResponseEntity<ApiResponse<RoomTypeResponse>> createRoom(
            @RequestBody roomTypeCreationRequest request) {
        log.info("Creating room");

        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeService.createRoomType(request))
                .build());
    }

    @PutMapping
    public ApiResponse<RoomTypeResponse> updateRoom(
            @RequestBody roomTypeUpdateRequest request,
            @RequestHeader("Authorization") String token
    ) {
        return ApiResponse.<RoomTypeResponse>builder()
                .result(roomTypeService.updateRoomType(request, token.replace("Bearer ", "")))
                .build();
    }

    @DeleteMapping("/{roomTypeId}")
    public ResponseEntity<?> deleteRoom(
            @PathVariable String roomTypeId,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Deleting room");

        roomTypeService.deleteRoomType(roomTypeId, token.replace("Bearer ", ""));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @PatchMapping("/{roomTypeId}/enable")
    public ResponseEntity<?> enableRoom(

            @PathVariable String roomTypeId,
            @RequestHeader("Authorization") String token
    ) {
        log.info("Enabling room");

        roomTypeService.enableRoomType(roomTypeId, token.replace("Bearer ", ""));
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("");
    }

    @GetMapping("{roomTypeId}")
    public ApiResponse<?> getRoom(
            @PathVariable String roomTypeId
    ) {
        log.info("Getting room");

        return ApiResponse.builder()
                .result(roomTypeService.getRoomType(roomTypeId))
                .build();
    }

    @GetMapping
    public ApiResponse<ListResponse<RoomTypeResponse>> getAllRooms(
            @RequestParam(defaultValue = "0", required = false) int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) Boolean isAvailable
    ) {
        return ApiResponse.<ListResponse<RoomTypeResponse>>builder()
                .result(roomTypeService.getAllRoomTypes(pageNum, pageSize, sortBy, order, search, isAvailable))
                .build();
    }
}
