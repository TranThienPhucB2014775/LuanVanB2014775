package com.post.service;

import java.util.Collection;

import com.event.dto.ReportCreationEvent;
import com.post.dto.request.TenantPostReportRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.event.dto.CreateNotificationEvent;
import com.post.dto.request.TenantPostCreationRequest;
import com.post.dto.request.TenantPostUpdateRequest;
import com.post.dto.response.ListPostResponse;
import com.post.dto.response.TenantPostResponse;
import com.post.entity.TenantPost;
import com.post.exception.AppException;
import com.post.exception.ErrorCode;
import com.post.mapper.TenantPostMapper;
import com.post.repository.PriceRange;
import com.post.repository.TenantPostRepository;
import com.post.repository.specification.TenantPostSpecification;
import com.post.service.client.UserClient;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TenantPostService {

    TenantPostRepository tenantPostRepository;
    UserClient userClient;

    KafkaTemplate<String, Object> kafkaTemplate;

    public TenantPostResponse createTenantPost(TenantPostCreationRequest request) {

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        TenantPost tenantPost = TenantPostMapper.mapTenantPostCreationRequestToTenantPost(request);
        tenantPost.setUserId(userId);
        tenantPost.setIsAvailable(true);

        return TenantPostMapper.mapToTenantPostResponse(
                tenantPostRepository.save(tenantPost),
                userClient.getUserByUserId(userId).getResult());
    }

    public void reportTenantPost(TenantPostReportRequest request) {
        TenantPost tenantPost = tenantPostRepository
                .findById(request.getTenantPostId())
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_POST_NOT_FOUND));

        kafkaTemplate.send(
                "create-report",
                ReportCreationEvent.builder()
                        .reportType("TENANT_POST")
                        .message(request.getMessage())
                        .itemId(request.getTenantPostId())
                        .userId(SecurityContextHolder.getContext()
                                .getAuthentication()
                                .getName())
                        .build());
    }

    public TenantPostResponse updateTenantPost(TenantPostUpdateRequest request) {

        TenantPost tenantPost = tenantPostRepository
                .findById(request.getTenantPostId())
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_POST_NOT_FOUND));

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!tenantPost.getUserId().equals(userId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        tenantPost.setPrice(request.getPrice());
        tenantPost.setDescription(request.getDescription());
        tenantPost.setAddress(request.getAddress());
        tenantPost.setCity(request.getCity());
        tenantPost.setDistrict(request.getDistrict());
        tenantPost.setWard(request.getWard());
        tenantPost.setTitle(request.getTitle());

        return TenantPostMapper.mapToTenantPostResponse(
                tenantPostRepository.save(tenantPost),
                userClient.getUserByUserId(userId).getResult());
    }

    public TenantPostResponse getTenantPostById(String tenantPostId) {
        TenantPost tenantPost = tenantPostRepository
                .findById(tenantPostId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_POST_NOT_FOUND));

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Collection<? extends GrantedAuthority> authorities =
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {

            if (!userId.equals(tenantPost.getUserId())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        return TenantPostMapper.mapToTenantPostResponse(
                tenantPost, userClient.getUserByUserId(tenantPost.getUserId()).getResult());
    }

    public void enableTenantPost(String tenantPostId) {
        TenantPost tenantPost = tenantPostRepository
                .findById(tenantPostId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_POST_NOT_FOUND));

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Collection<? extends GrantedAuthority> authorities =
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!tenantPost.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        tenantPost.setIsAvailable(true);
        tenantPostRepository.save(tenantPost);

        kafkaTemplate.send(
                "create-notification",
                CreateNotificationEvent.builder()
                        .recipient(userId)
                        .message("Bài đăng " + tenantPost.getTitle() + " đã được kích hoạt")
                        .title("Bài đăng đã được kích hoạt")
                        .build());
    }

    public void deleteTenantPost(String tenantPostId) {

        TenantPost tenantPost = tenantPostRepository
                .findById(tenantPostId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_POST_NOT_FOUND));

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Collection<? extends GrantedAuthority> authorities =
                SecurityContextHolder.getContext().getAuthentication().getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!tenantPost.getUserId().equals(userId)) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        tenantPost.setIsAvailable(false);
        tenantPostRepository.save(tenantPost);

        kafkaTemplate.send(
                "create-notification",
                CreateNotificationEvent.builder()
                        .recipient(userId)
                        .message("Bài đăng " + tenantPost.getTitle() + " đã bị ẩn")
                        .title("Bài đăng đã bị ẩn")
                        .build());
    }

    public ListPostResponse<TenantPostResponse> getTenantPost(
            int pageNum,
            int pageSize,
            String search,
            String tenantPostType,
            String userId,
            Integer minPrice,
            Integer maxPrice,
            String city,
            String district,
            String ward,
            Boolean isAvailable) {

        if (!isAvailable) {
            try {
                log.info("1");
                Collection<? extends GrantedAuthority> authorities =
                        SecurityContextHolder.getContext().getAuthentication().getAuthorities();
                if (authorities.stream()
                        .noneMatch(grantedAuthority ->
                                grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                    var userIdAuth = SecurityContextHolder.getContext()
                            .getAuthentication()
                            .getName();
                    if (!userId.equals(userIdAuth)) {
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                    }
                }
            } catch (Exception e) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        log.info(isAvailable.toString());

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<TenantPost> tenantPostPage = searchTenantPost(
                search, tenantPostType, userId, minPrice, maxPrice, city, district, ward, isAvailable, pageable);

        PriceRange priceRange = tenantPostRepository.getPriceRange();

        return ListPostResponse.<TenantPostResponse>builder()
                .data(tenantPostPage
                        .map(tenantPost -> TenantPostMapper.mapToTenantPostResponse(
                                tenantPost,
                                userClient
                                        .getUserByUserId(tenantPost.getUserId())
                                        .getResult()))
                        .toList())
                .totalElement(tenantPostPage.getTotalElements())
                .totalPage(tenantPostPage.getTotalPages())
                .maxPrice(priceRange.getMaxPrice())
                .minPrice(priceRange.getMinPrice())
                .build();
    }

    private Page<TenantPost> searchTenantPost(
            String search,
            String tenantPostType,
            String userId,
            Integer minPrice,
            Integer maxPrice,
            String city,
            String district,
            String ward,
            Boolean isAvailable,
            Pageable pageable) {
        Specification<TenantPost> specification = Specification.where(TenantPostSpecification.withSearch(search))
                .and(TenantPostSpecification.withTenantPostType(tenantPostType))
                .and(TenantPostSpecification.withUserId(userId))
                .and(TenantPostSpecification.withMinPrice(minPrice))
                .and(TenantPostSpecification.withMaxPrice(maxPrice))
                .and(TenantPostSpecification.withCity(city))
                .and(TenantPostSpecification.withDistrict(district))
                .and(TenantPostSpecification.withWard(ward))
                .and(TenantPostSpecification.withAvailability(isAvailable));

        return tenantPostRepository.findAll(specification, pageable);
    }
}
