package com.post.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum TenantPostType {
    @JsonProperty("ROOM_SUBLET")
    ROOM_SUBLET,
    @JsonProperty("LOOKING_FOR_ROOMMATE")
    LOOKING_FOR_ROOMMATE,
    @JsonProperty("LOOKING_FOR_ROOM_TO_RENT")
    LOOKING_FOR_ROOM_TO_RENT
}
