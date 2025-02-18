package com.property.service;

import java.util.Collection;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.event.dto.CreateNotificationEvent;
import com.property.config.CustomJwtDecoder;
import com.property.dto.request.CreateNotificationToTenant;
import com.property.dto.request.RoomTypeCreationRequest;
import com.property.dto.request.RoomTypeUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.RoomTypeResponse;
import com.property.entity.*;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.RoomTypeMapper;
import com.property.repository.ApartmentRepository;
import com.property.repository.RoomRepository;
import com.property.repository.RoomTypeRepository;
import com.property.repository.TenantRepository;
import com.property.repository.specification.RoomTypeSpecifications;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomTypeService {

    RoomTypeRepository roomTypeRepository;
    RoomRepository roomRepository;
    ApartmentRepository apartmentRepository;
    CustomJwtDecoder customJwtDecoder;
    TenantRepository tenantRepository;
    KafkaTemplate<String, Object> kafkaTemplate;

    public RoomTypeResponse createRoomType(RoomTypeCreationRequest request) {

        Apartment apartment = apartmentRepository
                .findById(request.getApartmentId())
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));
        RoomType roomType = RoomTypeMapper.mapToRoomType(request);
        roomType.setApartment(apartment);
        roomType.setIsAvailable(true);
        roomTypeRepository.save(roomType);
        return RoomTypeMapper.mapToRoomTypeResponse(roomType, 0);
    }

    public void deleteRoomType(String roomTypeId) {
        log.info("Enable room type" + roomTypeId);

        RoomType roomType = roomTypeRepository
                .findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        List<Room> rooms = roomRepository.findAllByRoomType(roomType);
        for (Room room : rooms) {
            if (room.getIsAvailable()) {
                throw new AppException(ErrorCode.ROOM_AVAILABLE);
            }
        }

        if (!authorities.stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!roomType.getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        roomType.setIsAvailable(false);
        roomTypeRepository.save(roomType);
    }

    public void enableRoomType(String roomTypeId) {
        log.info("Enable room type" + roomTypeId);
        RoomType roomType = roomTypeRepository
                .findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        if (!roomType.getApartment().getIsAvailable()) {
            throw new AppException(ErrorCode.APARTMENT_NOT_AVAILABLE);
        }

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (!authorities.stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!roomType.getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        roomType.setIsAvailable(true);
        roomTypeRepository.save(roomType);
    }

    public RoomTypeResponse updateRoomType(RoomTypeUpdateRequest request) {
        RoomType roomType = roomTypeRepository
                .findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (!authorities.stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!roomType.getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        roomType.setName(request.getName());
        roomType.setDescription(request.getDescription());
        roomType.setInfo(request.getInfo());
        roomType.setUtility(request.getUtility());
        roomTypeRepository.save(roomType);

        return RoomTypeMapper.mapToRoomTypeResponse(roomType, 0);
    }

    public RoomTypeResponse getRoomType(String roomTypeId) {
        RoomType roomType = roomTypeRepository
                .findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));
        return RoomTypeMapper.mapToRoomTypeResponse(
                roomType,
                tenantRepository.countTenantsByApartmentIdOrRoomTypeIdAndUserIdAndContractIsAvailable(
                        null, roomType.getRoomTypeId(), null));
    }

    public ListResponse<RoomTypeResponse> getAllRoomTypes(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            Boolean isAvailable,
            String userId,
            String apartmentId) {

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        Page<RoomType> roomTypePage = getAllRoomTypes(
                search,
                isAvailable,
                userId.isEmpty() ? null : userId,
                apartmentId.isEmpty() ? null : apartmentId,
                pageable);
        return ListResponse.<RoomTypeResponse>builder()
                .totalElement(roomTypePage.getTotalElements())
                .totalPage(roomTypePage.getTotalPages())
                .data(roomTypePage.stream()
                        .map(roomType -> {
                            return RoomTypeMapper.mapToRoomTypeResponse(
                                    roomType,
                                    tenantRepository
                                            .countTenantsByApartmentIdOrRoomTypeIdAndUserIdAndContractIsAvailable(
                                                    null, roomType.getRoomTypeId(), userId.isEmpty() ? null : userId));
                        })
                        .toList())
                .build();
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public void pushNotificationToTenant(CreateNotificationToTenant request, String roomTypeId) {
        RoomType roomType = roomTypeRepository
                .findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        if (!roomType.getApartment().getIsAvailable()) {
            throw new AppException(ErrorCode.APARTMENT_NOT_AVAILABLE);
        }

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!roomType.getApartment().getUserId().equals(authentication.getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        List<String> tenants = tenantRepository.findByRoomTypeId(roomTypeId, true);

        log.info("Tenants: {}", tenants);

        for (String tenant : tenants) {
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .recipient(tenant)
                            .message(request.getMessage())
                            .title(request.getTitle())
                            .build());
        }
    }

    Page<RoomType> getAllRoomTypes(
            String search, Boolean isAvailable, String userId, String apartmentId, Pageable pageable) {

        Specification<RoomType> spec = Specification.where(RoomTypeSpecifications.withSearch(search))
                .and(RoomTypeSpecifications.withAvailability(isAvailable))
                .and(RoomTypeSpecifications.withUserId(userId))
                .and(RoomTypeSpecifications.withApartmentId(apartmentId));

        return roomTypeRepository.findAll(spec, pageable);
    }
}
