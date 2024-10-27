package com.property.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.property.constant.RentStatus;
import com.property.dto.request.RoomCreationRequest;
import com.property.dto.response.RoomResponse;
import com.property.dto.response.TenantRoomResponse;
import com.property.entity.Room;
import com.property.entity.RoomType;
import com.property.entity.Tenant;
import com.property.service.DateTimeFormatter;
import com.property.service.ElapsedTimeCalculator;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoomMapper {

    private static final Logger log = LoggerFactory.getLogger(RoomMapper.class);

    DateTimeFormatter dateTimeFormatter;

//    ElapsedTimeCalculator elapsedTimeCalculator;

    public static List<Room> roomCreationRequestToRoom(RoomCreationRequest request, RoomType roomType) {

        List<Room> roomList = request.getName().stream()
                .map(name -> {
                    return Room.builder()
                            .name(name)
                            .rentStatus(RentStatus.AVAILABLE.toString())
                            .isAvailable(true)
                            .roomType(roomType)
                            .currentOccupancy(0)
                            .build();
                })
                .collect(Collectors.toList());

        return roomList;
    }

    public static RoomResponse roomToRoomResponse(Room room) {
        return RoomResponse.builder()
                .roomId(room.getRoomId())
                .name(room.getName())
                .isAvailable(room.getIsAvailable())
                .rentStatus(room.getRentStatus())
                .currentOccupancy(room.getCurrentOccupancy())
                .roomTypeId(room.getRoomType().getRoomTypeId())
                .apartmentId(room.getRoomType().getApartment().getApartmentId())
                .build();
    }

    public static TenantRoomResponse roomToTenantRoomResponse(Room room, Tenant tenant) {


        return new TenantRoomResponse(
                room.getName(),
                room.getIsAvailable(),
                room.getRentStatus(),
                room.getRoomId(),
                room.getCurrentOccupancy(),
                room.getRoomType().getApartment().getUserId(),
                room.getRoomType().getRoomTypeId(),
                room.getRoomType().getApartment().getApartmentId(),
                tenant.getIsAvailable()
                        ? null
                        : ElapsedTimeCalculator.calculateElapsedTime(tenant.getCreatedAt(), tenant.getUpdatedAt())
        );
    }
}
