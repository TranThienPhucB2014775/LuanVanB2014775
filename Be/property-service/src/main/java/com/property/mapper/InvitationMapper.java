package com.property.mapper;

import com.property.dto.response.InvitationResponse;
import com.property.entity.Invitation;
import com.property.service.DateTimeFormatter;
import org.springframework.beans.factory.annotation.Autowired;

public class InvitationMapper {

    static DateTimeFormatter dateTimeFormatter;

    public static InvitationResponse mapToInvitationResponse(Invitation invitation) {
        return InvitationResponse.builder()
                .landlordId(invitation.getLandlordId())
                .invitationStatus(invitation.getInvitationStatus())
                .inviteToken(invitation.getInviteToken())
                .message(invitation.getMessage())
                .room(RoomMapper.roomToRoomResponse(invitation.getRoom()))
                .roomType(RoomTypeMapper.mapToRoomTypeResponse(invitation.getRoom().getRoomType()))
                .createdAt(invitation.getCreatedAt().toString())
                .depositAmount(invitation.getDepositAmount())
                .price(invitation.getPrice())
                .build();
    }
}
