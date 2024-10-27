package com.post.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

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
