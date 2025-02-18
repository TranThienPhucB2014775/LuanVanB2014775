package com.post.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@ToString
@Setter
@Builder
public class RentalPostCreationRequest {

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
    Integer area;

    String tenantType;

    @NotBlank(message = "INVALID_VALUE")
    long price;

    @NotBlank(message = "INVALID_VALUE")
    String rentalType;
}
