package com.property.mapper;

import java.time.Instant;

import com.property.dto.response.InvitationResponse;
import com.property.entity.Invitation;
import com.property.service.DateTimeFormatter;

public class InvitationMapper {

    static DateTimeFormatter dateTimeFormatter;

    public static InvitationResponse mapToInvitationResponse(
            Invitation invitation, Instant startDate, Instant endDate) {
        return InvitationResponse.builder()
                .landlordId(invitation.getLandlordId())
                .invitationStatus(invitation.getInvitationStatus())
                .inviteToken(invitation.getInviteToken())
                .message(invitation.getMessage())
                .room(RoomMapper.roomToRoomResponse(invitation.getRoom(), null))
                .roomType(RoomTypeMapper.mapToRoomTypeResponse(
                        invitation.getRoom().getRoomType(), 0))
                .createdAt(invitation.getCreatedAt().toString())
                .depositAmount(invitation.getDepositAmount())
                .price(invitation.getPrice())
                .endDate(endDate)
                .startDate(startDate)
                .build();
    }
}
