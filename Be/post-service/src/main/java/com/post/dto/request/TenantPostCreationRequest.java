package com.post.dto.request;

import com.post.validation.TenantPostTypeSubset;
import jakarta.validation.constraints.NotNull;

import com.post.constant.TenantPostType;
import lombok.Getter;

@Getter
public class TenantPostCreationRequest {

    @NotNull(message = "INVALID_VALUE")
    String title;

    @NotNull(message = "INVALID_VALUE")
    String description;

    @NotNull(message = "INVALID_VALUE")
    long price;

    @NotNull(message = "INVALID_VALUE")
    String city;

    @NotNull(message = "INVALID_VALUE")
    String district;

    @NotNull(message = "INVALID_VALUE")
    String address;

    @NotNull(message = "INVALID_VALUE")
    String ward;

    @TenantPostTypeSubset(
            anyOf = {
                TenantPostType.LOOKING_FOR_ROOM_TO_RENT,
                TenantPostType.LOOKING_FOR_ROOMMATE,
                TenantPostType.ROOM_SUBLET
            },
            message = "INVALID_VALUE")
    String tenantPostType;
}
