package com.property.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.event.dto.ReportCreationEvent;
import com.property.dto.ApiResponse;
import com.property.dto.request.*;
import com.property.dto.response.FeedBackResponse;
import com.property.entity.*;
import com.property.repository.*;
import com.property.service.client.InteractClient;
import org.springframework.boot.actuate.security.AuthenticationAuditListener;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.property.config.CustomJwtDecoder;
import com.property.dto.response.ApartmentResponse;
import com.property.dto.response.ListResponse;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.ApartmentMapper;
import com.property.repository.specification.ApartmentSpecifications;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@ToString
public class ApartmentService {
    ApartmentRepository apartmentRepository;
    ApartmentTypeRepository getAllAdditionalCost;
    CustomJwtDecoder customJwtDecoder;
    TenantRepository tenantRepository;

    InteractClient interactClient;

    KafkaTemplate<String, Object> kafkaTemplate;
    RoomTypeRepository roomTypeRepository;
    RoomRepository roomRepository;
    ContractRepository contractRepository;

    public ApartmentResponse getApartment(String apartmentId) {

        return ApartmentMapper.apartmentToApartmentResponse(apartmentRepository
                .findById(apartmentId)
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND)));
    }

    public ApartmentResponse createApartment(ApartmentCreationRequest request) {

        ApartmentType apartmentType = getAllAdditionalCost
                .findById(request.getApartmentType())
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_TYPE_EXISTED));
        log.info(apartmentType.toString());

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Apartment apartment = ApartmentMapper.creationApartmentRequestToApartment(request);
        apartment.setUserId(authentication.getName());
        apartment.setApartmentType(apartmentType);
        apartment.setIsAvailable(true);
        log.info(apartmentType.toString());

        apartmentRepository.save(apartment);

        return ApartmentMapper.apartmentToApartmentResponse(apartment);
    }

    public ApiResponse<FeedBackResponse> createRating(
            ApartmentRatingCreationRequest request,
            String token
    ) {

        List<Tenant> tenants = tenantRepository.findByApartmentId(request.getApartmentId());

        log.info("tenant: " + tenants.toString());

        var auth = SecurityContextHolder.getContext().getAuthentication();

        log.info("auth: " + auth.getName());

        if (tenants.stream().noneMatch(tenant -> tenant.getTenantId().equals(auth.getName()))) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        log.info("auth: " + auth.getName());

        return interactClient.createRating(
                "Bearer " + token,
                FeedBackCreationRequest.builder()
                        .rating(request.getRating())
                        .feedBack(request.getFeedBack())
                        .itemId(request.getApartmentId())
                        .feedBackType("APARTMENT")
                        .build()
        );
    }

    public ApartmentResponse updateApartment(ApartmentUpdateRequest request) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Apartment apartment = apartmentRepository
                .findById(request.getApartmentId())
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!apartment.getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        apartment.setCity(request.getCity());
        apartment.setAddress(request.getAddress());
        apartment.setDescription(request.getDescription());
        apartment.setUtility(request.getUtility());
        apartment.setRule(request.getRule());
        if (!request.getApartmentType().equals(apartment.getApartmentType().getName())) {
            ApartmentType apartmentType = getAllAdditionalCost
                    .findById(request.getApartmentType())
                    .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_TYPE_EXISTED));
            apartment.setApartmentType(apartmentType);
        }

        apartmentRepository.save(apartment);

        return ApartmentMapper.apartmentToApartmentResponse(apartment);
    }

    public void deleteApartment(String request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Apartment apartment = apartmentRepository
                .findById(request)
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

        List<RoomType> roomTypes = roomTypeRepository.findAllByApartment(apartment);

        if (!roomTypes.isEmpty()) {
            for (RoomType roomType : roomTypes) {
                if (roomType.getIsAvailable()) {
                    throw new AppException(ErrorCode.ROOM_TYPE_AVAILABLE);
                }
            }
        }


        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!apartment.getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        apartment.setIsAvailable(false);

        apartmentRepository.save(apartment);
    }

    public void enableApartment(String request) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Apartment apartment = apartmentRepository
                .findById(request)
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (!authorities.stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!apartment.getUserId().equals(authentication.getName())) {
                log.info(authentication.getName());
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        apartment.setIsAvailable(true);

        apartmentRepository.save(apartment);
    }

    public ListResponse<ApartmentResponse> getAllApartments(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            Boolean isAvailable,
            String city,
            String userId,
            String apartmentType) {
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
            log.info("1");
        }

        log.info("role: " + authorities.toString());
        log.info("userId: " + userId);

        Page<Apartment> apartments = searchApartments(search, isAvailable, city, userId, apartmentType, pageable);

        return ListResponse.<ApartmentResponse>builder()
                .totalElement(apartments.getTotalElements())
                .totalPage(apartments.getTotalPages())
                .data(apartments.stream()
                        .map(ApartmentMapper::apartmentToApartmentResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    public void reportApartment(ApartmentReportRequest request) {

        Apartment apartment = apartmentRepository
                .findById(request.getApartmentId()).orElseThrow(
                        () -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

        kafkaTemplate.send(
                "create-report",
                ReportCreationEvent.builder()
                        .reportType("APARTMENT")
                        .message(request.getMessage())
                        .itemId(request.getApartmentId())
                        .userId(SecurityContextHolder.getContext().getAuthentication().getName())
                        .build()
        );

    }

    Page<Apartment> searchApartments(
            String search, Boolean isAvailable, String city, String userId, String apartmentType, Pageable pageable) {
        Specification<Apartment> spec = Specification.where(ApartmentSpecifications.withSearch(search))
                .and(ApartmentSpecifications.withAvailability(isAvailable))
                .and(ApartmentSpecifications.withCity(city))
                .and(ApartmentSpecifications.withUserId(userId))
                .and(ApartmentSpecifications.withApartmentType(apartmentType));

        return apartmentRepository.findAll(spec, pageable);
    }
}
