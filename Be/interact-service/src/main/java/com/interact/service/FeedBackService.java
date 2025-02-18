package com.interact.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
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

import com.event.dto.CreateNotificationEvent;
import com.interact.constant.FeedBackTypes;
import com.interact.dto.request.FeedBackCreationRequest;
import com.interact.dto.request.FeedBackUpdateRequest;
import com.interact.dto.response.*;
import com.interact.entity.FeedBack;
import com.interact.exception.AppException;
import com.interact.exception.ErrorCode;
import com.interact.mapper.FeedBackMapper;
import com.interact.repository.FeedBackRepository;
import com.interact.repository.specification.FeedbackSpecification;
import com.interact.service.client.ProfileClient;
import com.interact.service.client.PropertyClient;

import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class FeedBackService {

    FeedBackRepository feedBackRepository;
    ProfileClient profileClient;
    PropertyClient propertyClient;

    @Value("${update.limit}")
    @NonFinal
    private int updateLimit;

    KafkaTemplate<String, Object> kafkaTemplate;

    public FeedBackResponse saveFeedBack(FeedBackCreationRequest request) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = authentication.getName();
        log.info("{}", request);
        log.info("{}", request.getFeedBack());

        try {
            if (request.getFeedBackType().equals(FeedBackTypes.LANDLORD.toString())) {
                if (userId.equals(request.getItemId())) {
                    throw new AppException(ErrorCode.FEED_BACK_NOT_ALLOWED);
                }

                String message = "";
                if (request.getFeedBackType() == FeedBackTypes.LANDLORD.toString()) {
                    message = "Chúc mừng, bạn có một phản hồi tốt từ người thuê";
                } else if (request.getFeedBackType() == FeedBackTypes.APARTMENT.toString()) {
                    message = "Khu trọ của bạn có một phản hồi mới";
                }

                kafkaTemplate.send(
                        "create-notification",
                        CreateNotificationEvent.builder()
                                .recipient(request.getItemId())
                                .message(message)
                                .title("Bạn có một phản hồi mới")
                                .build());

            } else if (request.getFeedBackType().equals(FeedBackTypes.APARTMENT.toString())) {
                try {
                    ApartmentResponse apartmentResponse = propertyClient
                            .getApartmentByApartmentId(request.getItemId())
                            .getResult();
                    if (userId.equals(apartmentResponse.getUserId())) {
                        throw new AppException(ErrorCode.FEED_BACK_NOT_ALLOWED);
                    }
                    kafkaTemplate.send(
                            "create-notification",
                            CreateNotificationEvent.builder()
                                    .recipient(request.getItemId())
                                    .message("Khu trọ của bạn có một phản hồi mới")
                                    .title("Khu trọ của bạn có một phản hồi mới")
                                    .build());
                } catch (FeignException e) {
                    throw new AppException(ErrorCode.ITEM_ID_INCORRECT);
                }
            }

            Optional<FeedBack> optionalFeedBack = feedBackRepository.findByUserIdAndItemId(userId, request.getItemId());

            if (optionalFeedBack.isPresent()) {
                throw new AppException(ErrorCode.FEED_BACK_ALREADY_EXISTS);
            }

            ProfileResponse profileResponse =
                    profileClient.getProfileByUserId(userId).getResult();

            FeedBack feedBack = FeedBackMapper.toFeedBack(request);
            feedBack.setUserId(userId);

            feedBack.setUpdateLimit(updateLimit);

            return FeedBackMapper.toFeedBackResponse(feedBackRepository.save(feedBack), profileResponse);
        } catch (FeignException e) {
            throw new AppException(ErrorCode.PROFILE_NOT_FOUND);
        }
    }

    public FeedBackResponse updateFeedBack(FeedBackUpdateRequest request) {
        FeedBack feedBack = feedBackRepository
                .findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.FEED_BACK_NOT_FOUND));

        if (feedBack.getUpdateLimit() <= 0) {
            throw new AppException(ErrorCode.FEED_BACK_ALREADY_UPDATED);
        }

        feedBack.setRating(request.getRating());
        feedBack.setFeedBack(request.getFeedback());
        feedBack.setUpdateLimit(feedBack.getUpdateLimit() - 1);

        return FeedBackMapper.toFeedBackResponse(
                feedBackRepository.save(feedBack),
                profileClient.getProfileByUserId(feedBack.getUserId()).getResult());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteFeedBack(String feedBackId) {
        FeedBack feedBack = feedBackRepository
                .findById(feedBackId)
                .orElseThrow(() -> new AppException(ErrorCode.FEED_BACK_NOT_FOUND));

        feedBack.setIsAvailable(false);

        feedBackRepository.save(feedBack);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void enableFeedBack(String feedBackId) {

        FeedBack feedBack = feedBackRepository
                .findById(feedBackId)
                .orElseThrow(() -> new AppException(ErrorCode.FEED_BACK_NOT_FOUND));

        feedBack.setIsAvailable(true);

        feedBackRepository.save(feedBack);
    }

    public void getFeedBackByItemId(String itemId) {}

    public FeedBackResponses getAllFeedBacks(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            Boolean isAvailable,
            String userId,
            String itemId) {

        if (!userId.isEmpty()) {
            var auth = SecurityContextHolder.getContext().getAuthentication();

            Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();

            if (authorities.stream()
                    .noneMatch(
                            grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                if (!userId.equals(auth.getName())) {
                    throw new AppException(ErrorCode.UNAUTHORIZED);
                }
            }
        }

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<FeedBack> feedBacks = searchFeedBacks(search, isAvailable, userId, itemId, pageable);

        List<FeedBackResponse> feedBackResponses = new ArrayList<>();

        for (FeedBack feedBack : feedBacks) {
            ProfileResponse profileResponse =
                    profileClient.getProfileByUserId(feedBack.getUserId()).getResult();
            feedBackResponses.add(FeedBackMapper.toFeedBackResponse(feedBack, profileResponse));
        }

        FeedBackResponses feedBackResponseReturn = new FeedBackResponses();

        feedBackResponseReturn.setTotalElement(feedBacks.getTotalElements());
        feedBackResponseReturn.setTotalPage(feedBacks.getTotalPages());

        feedBackResponseReturn.setData(feedBacks.stream()
                .map(feedBack -> {
                    ProfileResponse profileResponse = profileClient
                            .getProfileByUserId(feedBack.getUserId())
                            .getResult();
                    return FeedBackMapper.toFeedBackResponse(feedBack, profileResponse);
                })
                .toList());

        Long sumRating = feedBackRepository.sumByItemId(itemId);

        if (sumRating != null && feedBacks.getTotalElements() > 0) {
            BigDecimal rounded = BigDecimal.valueOf((double) sumRating / feedBacks.getTotalElements())
                    .setScale(2, RoundingMode.HALF_UP);
            feedBackResponseReturn.setAverageRating(rounded.doubleValue());
        } else {
            feedBackResponseReturn.setAverageRating(0.0);
        }

        return feedBackResponseReturn;
    }

    private Page<FeedBack> searchFeedBacks(
            String search, Boolean isAvailable, String userId, String itemId, Pageable pageable) {
        log.info("Searching feedbacks");
        Specification<FeedBack> specification = Specification.where(FeedbackSpecification.withSearch(search))
                .and(FeedbackSpecification.withAvailability(isAvailable))
                .and(FeedbackSpecification.withUserId(userId))
                .and(FeedbackSpecification.withItemId(itemId));
        log.info("Searching feedbacks");

        return feedBackRepository.findAll(specification, pageable);
    }

    public FeedBackResponses getFeedBacksByItemId(
            String itemId, int pageNum, int pageSize, String sortBy, String order) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<FeedBack> feedBacks = feedBackRepository.findAllByItemId(itemId, pageable);

        FeedBackResponses feedBackResponses = new FeedBackResponses();
        feedBackResponses.setTotalElement(feedBacks.getTotalElements());
        feedBackResponses.setTotalPage(feedBacks.getTotalPages());

        feedBackResponses.setData(feedBacks.stream()
                .map(feedBack -> {
                    ProfileResponse profileResponse = profileClient
                            .getProfileByUserId(feedBack.getUserId())
                            .getResult();
                    log.info("feedBack: " + feedBack.getFeedBack());
                    return FeedBackMapper.toFeedBackResponse(feedBack, profileResponse);
                })
                .toList());

        //        BigDecimal rounded = BigDecimal.valueOf((double) feedBackRepository.sumByItemId(itemId) /
        // feedBacks.getTotalElements()).setScale(2, RoundingMode.HALF_UP);
        //
        //        if (feedBacks.getTotalElements() > 0) {
        //            feedBackResponses.setAverageRating(rounded.doubleValue());
        //        } else {
        //            feedBackResponses.setAverageRating(0.0);
        //        }

        Long sumRating = feedBackRepository.sumByItemId(itemId);

        if (sumRating != null && feedBacks.getTotalElements() > 0) {
            BigDecimal rounded = BigDecimal.valueOf((double) sumRating / feedBacks.getTotalElements())
                    .setScale(2, RoundingMode.HALF_UP);
            feedBackResponses.setAverageRating(rounded.doubleValue());
        } else {
            feedBackResponses.setAverageRating(0.0);
        }

        return feedBackResponses;
    }

    public SummaryResponse getSummary() {
        return SummaryResponse.builder()
                .totalFeedBack(feedBackRepository.count())
                .build();
    }
}
