package com.property.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Setter
@Getter
public class TenantWithRoomTypeInfoResponse extends TenantResponse {

    String roomTypeName;
    String roomTypeId;
    String apartmentName;
    String apartmentId;
    String roomName;
    String roomId;

    public TenantWithRoomTypeInfoResponse(
            String userId,
            String rentalDuration,
            Instant startDate,
            Instant endDate,
            Boolean isAvailable,
            String roomTypeName,
            String roomTypeId,
            String apartmentName,
            String apartmentId,
            String roomName,
            String roomId
    ) {
        super(userId, rentalDuration, startDate.toString(),  endDate != null ? endDate.toString() : "N/A", isAvailable);
        this.roomTypeName = roomTypeName;
        this.roomTypeId = roomTypeId;
        this.apartmentName = apartmentName;
        this.apartmentId = apartmentId;
        this.roomName = roomName;
        this.roomId = roomId;
    }
}
