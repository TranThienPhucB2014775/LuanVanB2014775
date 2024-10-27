package com.property.dto.response;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
public class TenantRoomResponse extends RoomResponse {
    String rentalDuration;

    public TenantRoomResponse(String name, Boolean isAvailable, String rentStatus, String roomId,
                              int currentOccupancy, String landlordId, String roomTypeId, String apartmentId,
                              String rentalDuration)
    {
        super(
                name,
                isAvailable,
                rentStatus,
                roomId,
                landlordId,
                currentOccupancy,
                roomTypeId,
                apartmentId
                );
        this.rentalDuration = rentalDuration;
    }

    public TenantRoomResponse() {
        super();
    }
}
