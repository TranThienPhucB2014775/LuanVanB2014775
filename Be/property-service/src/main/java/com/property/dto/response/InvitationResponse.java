package com.property.dto.response;

import com.property.entity.Room;
import com.property.entity.RoomType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

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

    BigDecimal price;
    BigDecimal depositAmount;
}
