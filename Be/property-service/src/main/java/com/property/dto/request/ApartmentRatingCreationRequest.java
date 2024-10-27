package com.property.dto.request;

import com.property.validation.ApartmentTypeSubset;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import static com.property.constant.ApartmentTypes.*;

@Getter
@Setter
public class ApartmentRatingCreationRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "ITEM_ID_INCORRECT")
    String apartmentId;

    @Min(value = 1, message = "RATING_INCORRECT")
    @Max(value = 5, message = "RATING_INCORRECT")
    int rating;

    @Size(min = 20, max = 200, message = "FEEDBACK_INCORRECT")
    String feedBack;
}
