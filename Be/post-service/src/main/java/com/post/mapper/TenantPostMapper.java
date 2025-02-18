package com.post.mapper;

import com.post.dto.request.TenantPostCreationRequest;
import com.post.dto.response.TenantPostResponse;
import com.post.dto.response.UserResponse;
import com.post.entity.TenantPost;

public class TenantPostMapper {

    public static TenantPost mapTenantPostCreationRequestToTenantPost(TenantPostCreationRequest request) {
        return TenantPost.builder()
                .price(request.getPrice())
                .description(request.getDescription())
                .address(request.getAddress())
                .city(request.getCity())
                .district(request.getDistrict())
                .ward(request.getWard())
                .title(request.getTitle())
                .tenantPostType(request.getTenantPostType())
                .build();
    }

    public static TenantPostResponse mapToTenantPostResponse(TenantPost tenantPost, UserResponse userResponse) {
        return TenantPostResponse.builder()
                .tenantPostId(tenantPost.getTenantPostId())
                .userId(tenantPost.getUserId())
                .userName(userResponse.getUsername())
                .imgAvatar(userResponse.getImgAvatar())
                .title(tenantPost.getTitle())
                .description(tenantPost.getDescription())
                .price(tenantPost.getPrice())
                .city(tenantPost.getCity())
                .district(tenantPost.getDistrict())
                .address(tenantPost.getAddress())
                .ward(tenantPost.getWard())
                .isAvailable(tenantPost.getIsAvailable())
                .tenantPostType(tenantPost.getTenantPostType())
                .build();
    }
}
