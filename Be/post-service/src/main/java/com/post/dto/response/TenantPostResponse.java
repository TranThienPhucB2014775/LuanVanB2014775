package com.post.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
public class TenantPostResponse {

    String tenantPostId;

    String userId;

    String userName;

    String imgAvatar;

    String title;

    String description;

    long price;

    String location;

    Boolean isAvailable;

    String city;

    String district;

    String address;

    String ward;

    String tenantPostType;
}
