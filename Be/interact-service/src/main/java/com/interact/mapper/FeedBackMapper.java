package com.interact.mapper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.interact.dto.request.FeedBackCreationRequest;
import com.interact.dto.response.FeedBackResponse;
import com.interact.dto.response.ProfileResponse;
import com.interact.entity.FeedBack;

public class FeedBackMapper {
    private static final Logger log = LoggerFactory.getLogger(FeedBackMapper.class);

    public static FeedBackResponse toFeedBackResponse(FeedBack feedBack, ProfileResponse profileResponse) {
        return FeedBackResponse.builder()
                .id(feedBack.getId())
                .rating(feedBack.getRating())
                .userId(feedBack.getUserId())
                .feedBack(feedBack.getIsAvailable() ? feedBack.getFeedBack() : " This feedBack is not available")
                .isAvailable(feedBack.getIsAvailable())
                .imgAvatar(profileResponse.getImgAvatar())
                .userName(profileResponse.getUserName())
                .itemId(feedBack.getItemId())
                .feedBackType(feedBack.getFeedBackType())
                .build();
    }

    public static FeedBack toFeedBack(FeedBackCreationRequest feedBackCreationRequest) {
        return FeedBack.builder()
                .rating(feedBackCreationRequest.getRating())
                .feedBack(feedBackCreationRequest.getFeedBack())
                .itemId(feedBackCreationRequest.getItemId())
                .isAvailable(true)
                .feedBackType(feedBackCreationRequest.getFeedBackType())
                .build();
    }
}
