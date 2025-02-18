package com.property.dto.response;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class InvitationResponse {

    RoomResponse room;
    RoomTypeResponse roomType;

    String landlordId;

    String invitationStatus;

    String inviteToken;

    String message;
    String createdAt;

    Instant endDate;
    Instant startDate;

    BigDecimal price;
    BigDecimal depositAmount;
}
