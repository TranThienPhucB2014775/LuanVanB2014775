package com.post.service;

import com.event.dto.ReportCreationEvent;
import com.post.dto.request.RentalPostCreationRequest;
import com.post.dto.request.RentalPostReportRequest;
import com.post.dto.request.RentalPostUpdateRequest;
import com.post.dto.response.*;
import com.post.entity.Image;
import com.post.entity.RentalPost;
import com.post.exception.AppException;
import com.post.exception.ErrorCode;
import com.post.mapper.ImageMapper;
import com.post.mapper.RentalPostMapper;
import com.post.repository.ImageRepository;
import com.post.repository.PriceRange;
import com.post.repository.RentalPostRepository;
import com.post.repository.specification.RentalPostSpecification;
import com.post.service.client.MediaClientService;
import com.post.service.client.UserClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class RentalPostService {

    RentalPostRepository rentalPostRepository;
    ImageRepository imageRepository;

    RentalPostMapper rentalPostMapper;
    ImageMapper imageMapper;

    UserClient userClient;
    MediaClientService mediaClientService;

    KafkaTemplate<String, Object> kafkaTemplate;

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public RentalPostDetailResponse createRentalPost(
            RentalPostCreationRequest request,
            String token,
            List<MultipartFile> fileList
    ) {
        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        RentalPost rentalPost = rentalPostRepository.save(rentalPostMapper.rentalPostCreationRequestToRentalPost(request, userId));

        log.info("{}", rentalPost.getRentalPostId());

        List<String> uuidImages = new ArrayList<>();
        fileList.forEach(multipartFile -> {
            String uuid = UUID.randomUUID().toString();
            uuidImages.add(uuid);
            imageRepository.save(Image.builder()
                    .imageUrl(uuid + ".jpg")
                    .postId(rentalPost.getRentalPostId())
                    .userId(userId)
                    .build());
        });

        mediaClientService.uploadMediaImg(fileList, uuidImages);

        return rentalPostMapper.rentalPostDetailRequest(
                rentalPost
        );
    }

    public RentalPostDetailResponse updateRentalPost(
            RentalPostUpdateRequest request,
            String token
    ) {
        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        RentalPost rentalPost = rentalPostRepository.findById(request.getRentalPostId()).orElseThrow(
                () -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND)
        );

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!rentalPost.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        rentalPost.setTitle(request.getTitle());
        rentalPost.setDescription(request.getDescription());
        rentalPost.setPrice(request.getPrice());
        rentalPost.setAddress(request.getAddress());
        rentalPost.setArea(request.getArea());
        rentalPost.setCity(request.getCity());
        rentalPost.setDistrict(request.getDistrict());
        rentalPost.setWard(request.getWard());
        rentalPost.setPrice(request.getPrice());
        rentalPost.setTenantType(request.getTenantType());
        rentalPost.setAmenities(rentalPost.getAmenities());

        return rentalPostMapper.rentalPostDetailRequest(
                rentalPostRepository.save(rentalPost)
        );
    }

    public void deleteRentalPost(String rentalPostId) {

        RentalPost rentalPost = rentalPostRepository.findById(rentalPostId).orElseThrow(
                () -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND)
        );

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        var userId = SecurityContextHolder.getContext().getAuthentication().getName();
        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!rentalPost.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        rentalPost.setIsAvailable(false);
        log.info("{}", rentalPost.getIsAvailable());

        rentalPostRepository.save(rentalPost);
    }

    public void updateRentalPostStatus(String rentalPostId) {

        RentalPost rentalPost = rentalPostRepository.findById(rentalPostId).orElseThrow(
                () -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND)
        );

        Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        var userId = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("{}", userId);
        log.info("{}", rentalPost.getUserId());
        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!rentalPost.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        rentalPost.setIsAvailable(true);
        rentalPostRepository.save(rentalPost);
    }

    public RentalPostDetailResponse getRentalPost(String rentalPostId) {

        RentalPost rentalPost = rentalPostRepository.findById(rentalPostId).orElseThrow(
                () -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND)
        );

        if (!rentalPost.getIsAvailable()) {
            log.info("{}", rentalPost.getIsAvailable());
            try {
                Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
                if (authorities.stream()
                        .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                    var userId = SecurityContextHolder.getContext().getAuthentication().getName();
                    if (!rentalPost.getUserId().equals(userId)) {
                        throw new AppException(ErrorCode.RENTAL_POST_NOT_FOUND);
                    }
                }
            } catch (Exception e) {
                log.info("{}", e);
                throw new AppException(ErrorCode.RENTAL_POST_NOT_FOUND);
            }
        }

        List<Image> images = imageRepository.findByPostId(rentalPostId);

        RentalPostDetailResponse rentalPostDetailResponse = rentalPostMapper.rentalPostDetailRequest(
                rentalPost
        );

        rentalPostDetailResponse.setImages(imageMapper.toImageResponse(images));

        log.info("{}", rentalPostDetailResponse.getImages().size());

        return rentalPostDetailResponse;
    }

    public ListPostResponse<RentalPostListResponse> getAllRentalPosts(
            int pageNum,
            int pageSize,
            String order,
            String sortBy,
            String search,
            Boolean isAvailable,
            String tenantType,
            String userId,
            Integer priceMin,
            Integer priceMax,
            Integer areaMin,
            Integer areaMax,
            String city,
            String district,
            String ward

    ) {

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        if (!isAvailable) {
            try {
                log.info("1");
                Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
                if (authorities.stream()
                        .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                    var userIdAuth = SecurityContextHolder.getContext().getAuthentication().getName();
                    if (!userId.equals(userIdAuth)) {
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                    }
                }
            } catch (Exception e) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        log.info("2");

        Page<RentalPost> rentalPosts = getRentalPostListResponse(
                search,
                isAvailable,
                tenantType,
                userId,
                priceMin,
                priceMax,
                areaMin,
                areaMax,
                city,
                district,
                ward,
                pageable
        );

        log.info("3");

        Map<String, UserResponse> userResponseCache = new HashMap<>();

        PriceRange priceRange = rentalPostRepository.getPriceRange();

        return ListPostResponse.<RentalPostListResponse>builder()
                .data(rentalPosts.map(rentalPost -> {
                    UserResponse userResponse = userResponseCache.computeIfAbsent(
                            rentalPost.getUserId(),
                            id -> userClient.getUserByUserId(id).getResult()
                    );
                    return rentalPostMapper.rentalPostListResponse(rentalPost, userResponse);
                }).getContent())
                .totalElement(rentalPosts.getTotalElements())
                .totalPage(rentalPosts.getTotalPages())
                .minPrice(priceRange.getMinPrice() == null ? 0 : priceRange.getMinPrice())
                .maxPrice(priceRange.getMaxPrice() == null ? 100000000 : priceRange.getMaxPrice())
                .build();
    }

    public void reportRentalPost(RentalPostReportRequest request) {

        RentalPost rentalPost = rentalPostRepository.findById(request.getRentalPostId()).orElseThrow(
                () -> new AppException(ErrorCode.RENTAL_POST_NOT_FOUND)
        );

        kafkaTemplate.send(
                "create-report",
                ReportCreationEvent.builder()
                        .reportType("RENTER_POST")
                        .message(request.getMessage())
                        .itemId(request.getRentalPostId())
                        .userId(SecurityContextHolder.getContext().getAuthentication().getName())
                        .build()
        );

    }

    private Page<RentalPost> getRentalPostListResponse(
            String search,
            Boolean isAvailable,
            String tenantType,
            String userId,
            Integer priceMin,
            Integer priceMax,
            Integer areaMin,
            Integer areaMax,
            String city,
            String district,
            String ward,
            Pageable pageable
    ) {
        Specification<RentalPost> specification = Specification.where(
                        RentalPostSpecification.withSearch(search)
                ).and(RentalPostSpecification.withAvailability(isAvailable))
                .and(RentalPostSpecification.withTenantType(tenantType))
                .and(RentalPostSpecification.withUserId(userId))
                .and(RentalPostSpecification.withMinPrice(priceMin))
                .and(RentalPostSpecification.withMaxPrice(priceMax))
                .and(RentalPostSpecification.withMinArea(areaMin))
                .and(RentalPostSpecification.withMaxArea(areaMax))
                .and(RentalPostSpecification.withCity(city))
                .and(RentalPostSpecification.withDistrict(district))
                .and(RentalPostSpecification.withWard(ward));

        return rentalPostRepository.findAll(specification, pageable);
    }
}
