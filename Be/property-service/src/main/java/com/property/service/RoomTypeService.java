package com.property.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.property.entity.Contract;
import com.property.entity.Room;
import com.property.repository.RoomRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.property.config.CustomJwtDecoder;
import com.property.dto.request.RoomTypeCreationRequest;
import com.property.dto.request.RoomTypeUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.RoomTypeResponse;
import com.property.entity.Apartment;
import com.property.entity.RoomType;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.RoomTypeMapper;
import com.property.repository.ApartmentRepository;
import com.property.repository.RoomTypeRepository;
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

    public RoomTypeResponse createRoomType(RoomTypeCreationRequest request) {

        Apartment apartment = apartmentRepository
                .findById(request.getApartmentId())
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));
        RoomType roomType = RoomTypeMapper.mapToRoomType(request);
        roomType.setApartment(apartment);
        roomType.setIsAvailable(true);
        roomTypeRepository.save(roomType);
        log.info("Create room");

        return RoomTypeMapper.mapToRoomTypeResponse(roomType);
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

        if(!roomType.getApartment().getIsAvailable()){
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

        return RoomTypeMapper.mapToRoomTypeResponse(roomType);
    }

    public RoomTypeResponse getRoomType(String roomTypeId) {
        RoomType roomType = roomTypeRepository
                .findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));
        return RoomTypeMapper.mapToRoomTypeResponse(roomType);
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

//        if (userId.isEmpty()) {
//            if (!authorities.stream()
//                    .anyMatch(
//                            grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
//                userId = authentication.getName();
//                log.info(authentication.getName());
//            }
//        }

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
                        .map(RoomTypeMapper::mapToRoomTypeResponse)
                        .toList())
                .build();
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
