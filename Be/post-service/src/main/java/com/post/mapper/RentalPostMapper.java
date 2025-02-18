package com.post.mapper;

import org.springframework.stereotype.Component;

import com.post.dto.request.RentalPostCreationRequest;
import com.post.dto.response.RentalPostDetailResponse;
import com.post.dto.response.RentalPostListResponse;
import com.post.dto.response.UserResponse;
import com.post.entity.RentalPost;

@Component
public class RentalPostMapper {

    public RentalPost rentalPostCreationRequestToRentalPost(
            RentalPostCreationRequest rentalPostCreationRequest, String userId) {
        return RentalPost.builder()
                .title(rentalPostCreationRequest.getTitle())
                .address(rentalPostCreationRequest.getAddress())
                .city(rentalPostCreationRequest.getCity())
                .district(rentalPostCreationRequest.getDistrict())
                .ward(rentalPostCreationRequest.getWard())
                .area(rentalPostCreationRequest.getArea())
                .price(rentalPostCreationRequest.getPrice())
                .description(rentalPostCreationRequest.getDescription())
                .isAvailable(true)
                .amenities(rentalPostCreationRequest.getAmenities())
                .tenantType(
                        rentalPostCreationRequest.getTenantType().isEmpty()
                                ? "Tất cả"
                                : rentalPostCreationRequest.getTenantType())
                .rentalType(rentalPostCreationRequest.getRentalType())
                .userId(userId)
                .build();
    }

    public RentalPostDetailResponse rentalPostDetailRequest(RentalPost rentalPost) {
        return RentalPostDetailResponse.builder()
                .rentalPostId(rentalPost.getRentalPostId())
                .city(rentalPost.getCity())
                .district(rentalPost.getDistrict())
                .address(rentalPost.getAddress())
                .ward(rentalPost.getWard())
                .title(rentalPost.getTitle())
                .description(rentalPost.getDescription())
                .amenities(rentalPost.getAmenities())
                .area(rentalPost.getArea())
                .tenantType(rentalPost.getTenantType())
                .price(rentalPost.getPrice())
                .rentalType(rentalPost.getRentalType())
                .userId(rentalPost.getUserId())
                .isAvailable(rentalPost.getIsAvailable())
                .build();
    }

    public RentalPostListResponse rentalPostListResponse(RentalPost rentalPost, UserResponse userResponse) {
        return RentalPostListResponse.builder()
                .rentalPostId(rentalPost.getRentalPostId())
                .city(rentalPost.getCity())
                .district(rentalPost.getDistrict())
                .address(rentalPost.getAddress())
                .ward(rentalPost.getWard())
                .title(rentalPost.getTitle())
                .area(rentalPost.getArea())
                .price(rentalPost.getPrice())
                .rentalType(rentalPost.getRentalType())
                .userId(rentalPost.getUserId())
                .userName(userResponse.getUsername())
                .imgAvatar(userResponse.getImgAvatar())
                .isAvailable(rentalPost.getIsAvailable())
                .build();
    }
}
