package com.interact.dto.request;

import jakarta.validation.constraints.*;

import lombok.Getter;

@Getter
public class FeedBackUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "ITEM_ID_INCORRECT")
    @NotBlank(message = "ITEM_ID_EMPTY")
    String id;

    @Min(value = 1, message = "RATING_INCORRECT")
    @Max(value = 5, message = "RATING_INCORRECT")
    int rating;

    @Size(min = 20, message = "FEEDBACK_INCORRECT")
    String feedback;
}
