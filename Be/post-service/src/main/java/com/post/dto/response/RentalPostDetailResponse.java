package com.post.dto.response;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class RentalPostDetailResponse {

    String rentalPostId;

    String userId;

    String city;

    String district;

    String address;

    String ward;

    String title;

    String description;

    String amenities;

    Integer area;

    String tenantType;

    Boolean isAvailable;

    long price;

    String rentalType;

    List<ImageResponse> images;
}
