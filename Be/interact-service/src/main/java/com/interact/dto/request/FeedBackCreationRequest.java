package com.interact.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import com.interact.constant.FeedBackTypes;
import com.interact.validate.FeedBackTypeSubset;

import lombok.Getter;

@Getter
public class FeedBackCreationRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "ITEM_ID_INCORRECT")
    String itemId;

    @Min(value = 1, message = "RATING_INCORRECT")
    @Max(value = 5, message = "RATING_INCORRECT")
    int rating;

    @Size(min = 20, max = 200, message = "FEEDBACK_INCORRECT")
    String feedBack;

    @FeedBackTypeSubset(anyOf = {FeedBackTypes.APARTMENT, FeedBackTypes.LANDLORD, FeedBackTypes.RENTAL_POST})
    String feedBackType;
}
