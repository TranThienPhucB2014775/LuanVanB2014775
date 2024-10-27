package com.property.dto.response;

import java.util.Set;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomResponse {
    String name;

    Boolean isAvailable;

    String rentStatus;
    String roomId;
    String landlordId;
    int currentOccupancy;
    String roomTypeId;
    String apartmentId;
}
