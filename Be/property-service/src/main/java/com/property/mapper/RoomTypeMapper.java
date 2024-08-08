package com.property.mapper;

import com.property.dto.request.roomTypeCreationRequest;
import com.property.dto.response.RoomTypeResponse;
import com.property.entity.RoomType;

public class RoomTypeMapper {
    public static RoomType mapToRoomType(roomTypeCreationRequest request) {
        return RoomType.builder()
                .name(request.getName())
                .description(request.getDescription())
                .utility(request.getUtility())
                .info(request.getInfo())
                .build();
    }

    public static RoomTypeResponse mapToRoomTypeResponse(RoomType roomType) {
        return RoomTypeResponse.builder()
                .name(roomType.getName())
                .description(roomType.getDescription())
                .utility(roomType.getUtility())
                .info(roomType.getInfo())
                .apartmentId(roomType.getApartment().getApartmentId().toString())
                .build();
    }
}
