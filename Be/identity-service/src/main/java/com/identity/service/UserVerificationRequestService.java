package com.identity.service;

import java.util.*;

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

import com.event.dto.CreateNotificationEvent;
import com.identity.dto.Request.IsTenantRentingFromLandlordRequest;
import com.identity.dto.Request.UserVerificationUpdateRequest;
import com.identity.dto.Response.ListResponse;
import com.identity.dto.Response.UserVerificationRequestResponse;
import com.identity.entity.UserVerification;
import com.identity.entity.UserVerificationRequest;
import com.identity.exception.AppException;
import com.identity.exception.ErrorCode;
import com.identity.mapper.UserVerificationRequestMapper;
import com.identity.repository.UserVerificationRepository;
import com.identity.repository.UserVerificationRequestRepository;
import com.identity.repository.specification.UserVerificationRequestSpecification;
import com.identity.service.client.MediaClientService;
import com.identity.service.client.PropertyClientService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserVerificationRequestService {

    UserVerificationRequestRepository userVerificationRequestRepository;
    MediaClientService mediaClientService;
    UserVerificationService userVerificationService;
    UserVerificationRepository userVerificationRepository;

    PropertyClientService propertyClientService;

    KafkaTemplate<String, Object> kafkaTemplate;

    public UserVerificationRequestResponse save(MultipartFile file, String cardId) {

        log.info("UserVerificationRequestService.save: file={}, cardId={}", file, cardId);

        if (!isValidCardId(cardId)) {
            throw new AppException(ErrorCode.CARD_ID_INVALID);
        }

        List<String> fileName = new ArrayList<>();

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        String originalFilename = file.getOriginalFilename();
        assert originalFilename != null;
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));

        String uuid = UUID.randomUUID().toString();
        fileName.add(uuid.concat(fileExtension));
        log.info("UserVerificationRequestService.save: fileName={}", fileName);
        mediaClientService.uploadMediaImageCardId(file, fileName);
        log.info("UserVerificationRequestService.save: fileName={}", fileName);

        return UserVerificationRequestMapper.UserVerificationRequestCreationRequestToUserVerificationRequest(
                userVerificationRequestRepository.save(UserVerificationRequest.builder()
                        .cardId(cardId)
                        .urlIdCardNumber(uuid.concat(".jpg"))
                        .userId(userId)
                        .isChecked(false)
                        .message("")
                        .isSuccessful(null)
                        .build()));
    }

    public UserVerificationRequestResponse verifyUser(UserVerificationUpdateRequest request, String token) {

        var userVerificationRequest = userVerificationRequestRepository
                .findById(request.getId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_VERIFICATION_REQUEST_NOT_FOUND));

        if (userVerificationRequest.getIsChecked()) {
            throw new AppException(ErrorCode.USER_VERIFICATION_REQUEST_ALREADY_CHECKED);
        }

        userVerificationService.save(UserVerification.builder()
                .userId(userVerificationRequest.getUserId())
                .cardId(userVerificationRequest.getCardId())
                .urlCardId(userVerificationRequest.getUrlIdCardNumber())
                .build());

        userVerificationRequest.setIsSuccessful(request.getIsSuccessful());
        userVerificationRequest.setIsChecked(true);
        userVerificationRequest.setMessage(request.getMessage());

        if (request.getIsSuccessful()) {
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .message("Căn cước công dân của bạn đã được xác thực")
                            .recipient(userVerificationRequest.getUserId())
                            .title("Xác thực căn cước công dân")
                            .build());
        } else {
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .message("Yêu cầu xác thực căn cước công dân của bạn đã bị từ chối")
                            .recipient(userVerificationRequest.getUserId())
                            .title("Xác thực căn cước công dân")
                            .build());
        }

        return UserVerificationRequestMapper.UserVerificationRequestCreationRequestToUserVerificationRequest(
                userVerificationRequestRepository.save(userVerificationRequest));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserVerificationRequestResponse getById(String userId) {

        var userVerificationRequest = userVerificationRequestRepository
                .findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_VERIFICATION_REQUEST_NOT_FOUND));

        return UserVerificationRequestMapper.UserVerificationRequestCreationRequestToUserVerificationRequest(
                userVerificationRequest);
    }

    public UserVerificationRequestResponse get() {

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        log.info("UserVerificationRequestService.get: userId={}", userId);

        var userVerificationRequest = userVerificationRequestRepository
                .findByUserId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_VERIFICATION_REQUEST_NOT_FOUND));

        return UserVerificationRequestMapper.UserVerificationRequestCreationRequestToUserVerificationRequest(
                userVerificationRequest);
    }

    //    public ListResponse<UserVerificationRequestResponse> getALl(
    //            int pageNum,
    //            int pageSize,
    //            String sortBy,
    //            String order,
    //            String search,
    //            String userId,
    //            Boolean isChecked,
    //            Boolean isSuccessful
    //    ) {
    //
    //        log.info("1");
    //        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
    //        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);
    //
    //        var authentication = SecurityContextHolder.getContext().getAuthentication();
    //        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    //
    //        if (userId.isEmpty()) {
    //            if (authorities.stream().noneMatch(grantedAuthority ->
    // grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
    //                userId = authentication.getName();
    //            }
    //        }
    //
    //        log.info("UserVerificationRequestService.getALl: userId={}", isChecked);
    //
    //        Page<UserVerificationRequest> userVerificationRequests = searchUserVerificationRequest(
    //                search,
    //                userId,
    //                isChecked,
    //                isSuccessful,
    //                pageable);
    //
    //        return ListResponse.<UserVerificationRequestResponse>builder()
    //                .data(userVerificationRequests.stream().map(
    //
    // UserVerificationRequestMapper::UserVerificationRequestCreationRequestToUserVerificationRequest)
    //                        .toList()
    //                )
    //                .totalElement(userVerificationRequests.getTotalElements())
    //                .totalPage(userVerificationRequests.getTotalPages())
    //                .build();
    //    }

    public ListResponse<UserVerificationRequestResponse> getALl(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            String userId,
            Boolean isChecked,
            Boolean isSuccessful) {
        log.info("1");
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (userId.isEmpty()) {
            if (authorities.stream()
                    .noneMatch(
                            grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                userId = authentication.getName();
            }
        }

        Page<UserVerificationRequest> userVerificationRequests =
                searchUserVerificationRequest(search, userId, isChecked, isSuccessful, pageable);

        return ListResponse.<UserVerificationRequestResponse>builder()
                .data(userVerificationRequests.stream()
                        .map(
                                UserVerificationRequestMapper
                                        ::UserVerificationRequestCreationRequestToUserVerificationRequest)
                        .toList())
                .totalElement(userVerificationRequests.getTotalElements())
                .totalPage(userVerificationRequests.getTotalPages())
                .build();
    }

    Page<UserVerificationRequest> searchUserVerificationRequest(
            String search, String userId, Boolean isChecked, Boolean isSuccessful, Pageable pageable) {

        Specification<UserVerificationRequest> specification = Specification.where(
                        UserVerificationRequestSpecification.withSearch(search))
                .and(UserVerificationRequestSpecification.withUserId(userId))
                .and(UserVerificationRequestSpecification.withIsChecked(isChecked))
                .and(UserVerificationRequestSpecification.withIsSuccessful(isSuccessful));

        return userVerificationRequestRepository.findAll(specification, pageable);
    }

    public Boolean hasPermissionToViewIdCard(String img, String token) {

        UserVerification userVerification = userVerificationRepository
                .findByUrlCardId(img)
                .orElseThrow(() -> new AppException(ErrorCode.IMAGE_CARD_ID_NOT_FOUND));

        var userId = SecurityContextHolder.getContext().getAuthentication().getName();

        log.info(
                "UserVerificationRequestService.hasPermissionToViewIdCard: userVerification={}",
                userVerification.getUserId());
        log.info("UserVerificationRequestService.hasPermissionToViewIdCard: userId={}", userId);
        log.info(img);

        if (!userVerification.getUserId().equals(userId)) {
            var res = propertyClientService.isTenantRentingFromLandlord(
                    IsTenantRentingFromLandlordRequest.builder()
                            .landlordId(userId)
                            .tenantId(userVerification.getUserId())
                            .build(),
                    token);
            log.info("UserVerificationRequestService.hasPermissionToViewIdCard: res={}", res);
            return res.getResult();
        }
        return true;
    }

    private boolean isValidCardId(String cardId) {
        return cardId.matches("\\d{12}");
    }
}
