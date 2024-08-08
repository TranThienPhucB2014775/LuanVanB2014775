package com.property.service;

import com.property.config.CustomJwtDecoder;
import com.property.dto.request.roomTypeCreationRequest;
import com.property.dto.request.roomTypeUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.RoomTypeResponse;
import com.property.entity.Apartment;
import com.property.entity.RoomType;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.RoomTypeMapper;
import com.property.repository.ApartmentRepository;
import com.property.repository.RoomTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RoomTypeService {

    RoomTypeRepository roomTypeRepository;
    ApartmentRepository apartmentRepository;
    CustomJwtDecoder customJwtDecoder;

    public RoomTypeResponse createRoomType(roomTypeCreationRequest request) {

        Apartment apartment = apartmentRepository.findById(request.getApartmentId())
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));
        RoomType roomType = RoomTypeMapper.mapToRoomType(request);
        roomType.setApartment(apartment);
        roomTypeRepository.save(roomType);
        log.info("Create room");

        return RoomTypeMapper.mapToRoomTypeResponse(roomType);
    }

    public void deleteRoomType(String roomTypeId, String token) {
        log.info("Enable room type" + roomTypeId);

        RoomType roomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        var jwt = customJwtDecoder.decode(token);

        if (jwt.getSubject().equals(roomType.getApartment().getUserId())) {
            roomType.setIsAvailable(false);
            roomTypeRepository.save(roomType);
        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }

    public void enableRoomType(String roomTypeId, String token) {
        log.info("Enable room type" + roomTypeId);
        RoomType roomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        var jwt = customJwtDecoder.decode(token);

        if (jwt.getSubject().equals(roomType.getApartment().getUserId())) {
            roomType.setIsAvailable(true);
            roomTypeRepository.save(roomType);
        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }

    public RoomTypeResponse updateRoomType(
            roomTypeUpdateRequest request,
            String token
    ) {
        RoomType roomType = roomTypeRepository.findById(request.getRoomTypeId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND));

        var jwt = customJwtDecoder.decode(token);

        if (jwt.getSubject().equals(roomType.getApartment().getUserId())) {
            roomType.setName(request.getName());
            roomType.setDescription(request.getDescription());
            roomType.setInfo(request.getInfo());
            roomType.setUtility(request.getUtility());
            roomTypeRepository.save(roomType);

            return RoomTypeMapper.mapToRoomTypeResponse(roomType);

        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
    }

    public RoomTypeResponse getRoomType(String roomTypeId) {
        RoomType roomType = roomTypeRepository.findById(
                roomTypeId).orElseThrow(
                () -> new AppException(ErrorCode.ROOM_TYPE_NOT_FOUND)
        );
        return RoomTypeMapper.mapToRoomTypeResponse(roomType);
    }

    public ListResponse<RoomTypeResponse> getAllRoomTypes(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            Boolean isAvailable
    ) {

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);
        Page<RoomType> roomTypePage = roomTypeRepository.findAllRoomTypes(
                search, isAvailable, pageable
        );
        return ListResponse.<RoomTypeResponse>builder()
                .totalElement(roomTypePage.getTotalElements())
                .totalPage(roomTypePage.getTotalPages())
                .data(roomTypePage.stream()
                        .map(RoomTypeMapper::mapToRoomTypeResponse)
                        .toList())
                .build();
    }
}
