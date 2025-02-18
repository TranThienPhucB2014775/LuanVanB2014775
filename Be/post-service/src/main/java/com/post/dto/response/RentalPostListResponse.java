package com.post.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RentalPostListResponse {

    String rentalPostId;

    String userId;

    String userName;

    String imgAvatar;

    String city;

    String district;

    String address;

    String ward;

    String title;

    Integer area;

    long price;

    String rentalType;

    Boolean isAvailable;
}
