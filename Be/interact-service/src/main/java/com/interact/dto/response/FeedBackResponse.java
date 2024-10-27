package com.interact.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FeedBackResponse {
    String id;

    int rating;
    String userId;
    String feedBack;
    Boolean isAvailable;
    String imgAvatar;
    String userName;
    String itemId;
    String feedBackType;
}
