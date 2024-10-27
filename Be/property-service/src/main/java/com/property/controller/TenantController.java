package com.property.controller;

import com.property.dto.ApiResponse;
import com.property.dto.request.InviteTenantToLeaveRoomRequest;
import com.property.dto.request.IsTenantRentingFromLandlordRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.TenantResponse;
import com.property.dto.response.TenantRoomResponse;
import com.property.dto.response.TenantWithRoomTypeInfoResponse;
import com.property.service.TenantService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tenants")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TenantController {

    TenantService tenantService;

    @GetMapping("/{pageNum}/rental-history")
    public ApiResponse<ListResponse<TenantRoomResponse>> getTenant(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "true", required = true) Boolean isAvailable) {
        log.info("Getting tenant");
        return ApiResponse.<ListResponse<TenantRoomResponse>>builder()
                .result(
                        tenantService.getAllRentalRoomsForTenant(pageNum, pageSize, sortBy, order, isAvailable)
                )
                .build();
    }

    @GetMapping("/{roomId}/{pageNum}/tenants")
    public ApiResponse<ListResponse<TenantResponse>> getTenantsByRoom(
            @PathVariable String roomId,
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(required = true) Boolean isAvailable
    ) {
        log.info("Getting tenants");
        return ApiResponse.<ListResponse<TenantResponse>>builder()
                .result(tenantService.getAllTenantsForRoom(pageNum, pageSize, sortBy, order, roomId, isAvailable))
                .build();
    }

    @GetMapping("/{pageNum}/all")
    public ApiResponse<ListResponse<TenantWithRoomTypeInfoResponse>> getAll(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "asc", required = false) String order,
            @RequestParam(defaultValue = "", required = false) Boolean isAvailable
    ) {

        return ApiResponse.<ListResponse<TenantWithRoomTypeInfoResponse>>builder()
                .result(
                        tenantService.getAllTenantsForLandLord(pageNum, pageSize, sortBy, order, isAvailable)
                )
                .build();
    }

    @PostMapping("/leave")
    public ApiResponse<String> removeTenant(
            @RequestBody @Valid InviteTenantToLeaveRoomRequest request
    ) {
        tenantService.inviteTenantToLeaveRoom(request.getTenantId(), request.getRoomId());

        return ApiResponse.<String>builder()
                .result("Tenant removed")
                .build();
    }

    @PostMapping("/is-renting")
    public ApiResponse<Boolean> isTenantRentingFromLandlord(
            @RequestBody @Valid IsTenantRentingFromLandlordRequest request
    ) {
        log.info("Checking if tenant is renting from landlord");
        boolean isRenting = tenantService.isTenantRentingFromLandlord(request);
        return ApiResponse.<Boolean>builder()
                .result(isRenting)
                .build();
    }
}
