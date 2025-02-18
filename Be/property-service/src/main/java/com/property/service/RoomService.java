package com.property.service;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.event.dto.CreateNotificationEvent;
import com.nimbusds.jose.*;
import com.property.config.CustomJwtDecoder;
import com.property.constant.RentStatus;
import com.property.dto.request.*;
import com.property.dto.response.*;
import com.property.entity.*;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.RoomMapper;
import com.property.repository.ContractRepository;
import com.property.repository.RoomRepository;
import com.property.repository.RoomTypeRepository;
import com.property.repository.TenantRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomService {

    RoomTypeRepository roomTypeRepository;
    RoomRepository roomRepository;
    CustomJwtDecoder customJwtDecoder;
    private final ContractRepository contractRepository;
    TenantRepository tenantRepository;
    KafkaTemplate<String, Object> kafkaTemplate;

    InvoiceService invoiceService;

    public List<RoomResponse> createRoom(RoomCreationRequest request) {

        RoomType roomType = roomTypeRepository
                .findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        List<Room> room = RoomMapper.roomCreationRequestToRoom(request, roomType);
        //        room.stream().map(roomRepository::save);
        //        List<RoomResponse> roomResponses = room.stream().map(RoomMapper::roomToRoomResponse).toList();
        return room.stream()
                .map(roomRepository::save)
                .map(room1 ->
                        RoomMapper.roomToRoomResponse(room1, invoiceService.paidInvoiceResponse(room1.getRoomId())))
                .toList();
    }

    public RoomResponse updateRoom(RoomUpdateRequest request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Room room = roomRepository
                .findById(request.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        RoomType roomType = roomTypeRepository
                .findById(room.getRoomType().getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!roomType.getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        if (room.getRoomType().getApartment().getUserId().equals(authentication.getName())) {
            room.setName(request.getName());
            room.setRoomType(roomType);
            roomRepository.save(room);

            return RoomMapper.roomToRoomResponse(room, null);
        } else {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public void deleteRoom(String roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        Optional<Contract> contract = contractRepository.findByRoomIdAndIsAvailable(roomId, true);

        if (contract.isPresent()) {
            throw new AppException(ErrorCode.ROOM_HAS_CONTRACT);
        }

        if (!authorities.stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!room.getRoomType().getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        room.setIsAvailable(false);
        roomRepository.save(room);
    }

    public void enableRoom(String roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (!room.getRoomType().getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_TYPE_NOT_AVAILABLE);
        }

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!room.getRoomType().getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        room.setIsAvailable(true);
        roomRepository.save(room);
    }

    public RoomResponse getRoom(String roomId) {
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        return RoomMapper.roomToRoomResponse(room, invoiceService.paidInvoiceResponse(roomId));
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public void pushNotificationToTenant(CreateNotificationToTenant request, String roomId) {

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (!room.getIsAvailable()) {
            throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
        }
        if (!room.getRoomType()
                .getApartment()
                .getUserId()
                .equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        List<String> tenants = tenantRepository.findByRoomId(roomId);

        log.info("Tenants: {}", tenants);

        tenants.forEach(tenant -> {
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .recipient(tenant)
                            .message(request.getMessage())
                            .title(request.getTitle())
                            .build());
        });
    }

    public ListResponse<RoomResponse> getRooms(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            Boolean isAvailable,
            String rentStatus,
            String apartmentId,
            String apartmentName,
            String roomTypeId,
            String roomTypeName,
            String userId) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        log.info("apartmentId: {}", apartmentId);
        log.info("apartmentName: {}", apartmentName);
        log.info("roomTypeId: {}", roomTypeId);
        log.info("roomTypeName: {}", roomTypeName);
        log.info("userId: {}", userId);

        try {
            Page<Room> rooms = roomRepository.findRoomsWithDetails(
                    search,
                    isAvailable,
                    !rentStatus.isEmpty() ? RentStatus.valueOf(rentStatus).toString() : null,
                    apartmentId.isEmpty() ? null : apartmentId,
                    apartmentName.isEmpty() ? null : apartmentName,
                    roomTypeId.isEmpty() ? null : roomTypeId,
                    roomTypeName.isEmpty() ? null : roomTypeName,
                    userId.isEmpty() ? null : userId,
                    pageable);

            return ListResponse.<RoomResponse>builder()
                    .totalElement(rooms.getTotalElements())
                    .totalPage(rooms.getTotalPages())
                    .data(rooms.stream()
                            .map(room -> RoomMapper.roomToRoomResponse(
                                    room, invoiceService.paidInvoiceResponse(room.getRoomId())))
                            .toList())
                    .build();
        } catch (IllegalArgumentException e) {
            throw new AppException(ErrorCode.RENT_STATUS_INVALID);
        }
    }
}
