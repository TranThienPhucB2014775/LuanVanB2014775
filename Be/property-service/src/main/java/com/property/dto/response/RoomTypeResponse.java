package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RoomTypeResponse {
    String name;
    String description;
    String info;
    String utility;
    String apartmentId;
}
