package com.post.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
public class RentalPostUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String rentalPostId;

    @NotBlank(message = "INVALID_VALUE")
    String city;

    @NotBlank(message = "INVALID_VALUE")
    String district;

    @NotBlank(message = "INVALID_VALUE")
    String address;

    @NotBlank(message = "INVALID_VALUE")
    String ward;

    @NotBlank(message = "INVALID_VALUE")
    String title;

    @NotBlank(message = "INVALID_VALUE")
    String description;

    String amenities;

    @Min(value = 1, message = "INVALID_VALUE")
    int area;

    String tenantType;

    @Min(value = 1, message = "INVALID_VALUE")
    long price;

    @NotBlank(message = "INVALID_VALUE")
    String rentalType;

}
