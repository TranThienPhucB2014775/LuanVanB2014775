package com.post.dto.request;

import com.post.constant.TenantPostType;
import com.validation.TenantPostTypeSubset;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
public class TenantPostUpdateRequest {

    @Pattern(regexp = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", message = "UUID_INCORRECT_FORMAT")
    String tenantPostId;

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

    @TenantPostTypeSubset(anyOf = {
            TenantPostType.LOOKING_FOR_ROOM_TO_RENT,
            TenantPostType.LOOKING_FOR_ROOM_TO_RENT,
            TenantPostType.ROOM_SUBLET
    },
            message = "INVALID_VALUE")
    String tenantPostType;
}
