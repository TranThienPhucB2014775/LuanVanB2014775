package com.property.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class FeedBackCreationRequest {

    String itemId;

    int rating;

    String feedBack;

    String feedBackType;

}
