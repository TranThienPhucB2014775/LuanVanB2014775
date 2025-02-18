package com.property.mapper;

import com.property.dto.request.RoomTypeCreationRequest;
import com.property.dto.response.RoomTypeResponse;
import com.property.entity.RoomType;

public class RoomTypeMapper {
    public static RoomType mapToRoomType(RoomTypeCreationRequest request) {
        return RoomType.builder()
                .name(request.getName())
                .description(request.getDescription())
                .utility(request.getUtility())
                .info(request.getInfo())
                .maxOccupancy(request.getMaxOccupancy())
                .build();
    }

    public static RoomTypeResponse mapToRoomTypeResponse(RoomType roomType, int currentOccupancy) {
        return RoomTypeResponse.builder()
                .roomTypeId(roomType.getRoomTypeId())
                .name(roomType.getName())
                .description(roomType.getDescription())
                .utility(roomType.getUtility())
                .info(roomType.getInfo())
                .apartmentId(roomType.getApartment().getApartmentId())
                .isAvailable(roomType.getIsAvailable())
                .maxOccupancy(roomType.getMaxOccupancy())
                .currentOccupancy(currentOccupancy)
                .build();
    }
}
