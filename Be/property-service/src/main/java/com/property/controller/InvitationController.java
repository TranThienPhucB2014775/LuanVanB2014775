package com.property.controller;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.AcceptInviteRequest;
import com.property.dto.request.DisableInviteRequest;
import com.property.dto.request.InviteTenantToRoomRequest;
import com.property.dto.request.RefuseInviteRequest;
import com.property.dto.response.InvitationResponse;
import com.property.dto.response.ListResponse;
import com.property.service.InvitationService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/invitations")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class InvitationController {

    InvitationService invitationService;

    @PostMapping("/invite")
    public ApiResponse<?> inviteTenant(
            @RequestBody @Valid InviteTenantToRoomRequest request, @RequestHeader("Authorization") String token) {
        return ApiResponse.builder()
                .result(invitationService.inviteTenant(request, token.replace("Bearer ", "")))
                .build();
    }

    @PostMapping("/accept")
    public ResponseEntity<ApiResponse<String>> acceptInvite(@RequestBody @Valid AcceptInviteRequest request) {
        log.info("Inviting tenant to room");
        invitationService.acceptInvite(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<String>builder().result("Accepted").build());
    }

    @PostMapping("/refuse")
    public ResponseEntity<ApiResponse<String>> refuseInvite(@RequestBody @Valid RefuseInviteRequest request) {
        log.info("Inviting tenant to room");
        invitationService.refuseInvite(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<String>builder().result("Refused").build());
    }

    @PostMapping("/disable")
    public ResponseEntity<ApiResponse<String>> disableInvite(@RequestBody @Valid DisableInviteRequest request) {

        log.info("Inviting tenant to room");
        invitationService.disableInvite(request);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.<String>builder().result("Disabled").build());
    }

    @GetMapping("/{pageNum}")
    public ApiResponse<ListResponse<InvitationResponse>> getInvitationsByUser(
            @PathVariable int pageNum, @RequestParam(defaultValue = "4", required = false) int pageSize) {
        log.info("Getting invitations");
        return ApiResponse.<ListResponse<InvitationResponse>>builder()
                .result(invitationService.getInvitationsByUserId(pageNum, pageSize))
                .build();
    }

    @GetMapping("/all/{pageNum}")
    public ApiResponse<ListResponse<InvitationResponse>> getAllInvitations(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "5", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) String search,
            @RequestParam(defaultValue = "", required = false) String invitationStatus,
            @RequestParam(defaultValue = "", required = false) String userId,
            @RequestParam(defaultValue = "", required = false) String apartmentId,
            @RequestParam(defaultValue = "", required = false) String roomTypeId,
            @RequestParam(defaultValue = "", required = false) String roomId) {
        log.info("Getting invitations");
        return ApiResponse.<ListResponse<InvitationResponse>>builder()
                .result(invitationService.getALlInvitations(
                        pageNum,
                        pageSize,
                        sortBy,
                        order,
                        search,
                        invitationStatus,
                        userId,
                        apartmentId,
                        roomTypeId,
                        roomId))
                .build();
    }
}
