package com.property.dto.response;

import com.property.entity.RoomType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TenantWithRoomTypeInfoResponse extends TenantResponse {

    String roomTypeName;
    String roomTypeId;

    public TenantWithRoomTypeInfoResponse(String userId, String rentalDuration) {
        super(userId, rentalDuration);
    }
}
