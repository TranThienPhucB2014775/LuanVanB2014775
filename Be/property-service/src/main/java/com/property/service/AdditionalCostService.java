package com.property.service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.property.dto.request.AdditionalCostUnrecordedRequest;
import com.property.entity.*;
import com.property.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.property.dto.request.AdditionalCostCreationRequest;
import com.property.dto.request.AdditionalCostUpdateRequest;
import com.property.dto.response.AdditionalCostResponse;
import com.property.dto.response.ListResponse;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.AdditionalCostMapper;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AdditionalCostService {

    AdditionalCostRepository additionalCostRepository;
    ApartmentRepository apartmentRepository;
    AdditionalCostTypeRepository additionalCostTypeRepository;
    RoomRepository roomRepository;
    TenantRepository tenantRepository;
    InvoiceRepositoty invoiceRepositoty;

    public AdditionalCostResponse createAdditionalCost(AdditionalCostCreationRequest request) {

        Apartment apartment = apartmentRepository
                .findById(request.getApartmentId())
                .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

        AdditionalCost additionalCost = AdditionalCostMapper.additionalCostCreationRequestToAdditionalCost(request);
        AdditionalCostType additionalCostType = additionalCostTypeRepository.findById(request.getAdditionalCostType())
                .orElseThrow(() -> new AppException(ErrorCode.ADDITIONAL_COST_TYPE_NOT_FOUND));
        additionalCost.setApartment(apartment);
        additionalCost.setAdditionalCostType(additionalCostType);

        return AdditionalCostMapper.additionalCostToAdditionalCostResponse(
                additionalCostRepository.save(additionalCost));
    }

    public void removeAdditionalCost(String additionalCostId) {
        log.info("Remove additional cost");

        AdditionalCost additionalCost = additionalCostRepository
                .findById(additionalCostId)
                .orElseThrow(() -> new AppException(ErrorCode.ADDITIONAL_COST_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!additionalCost.getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        additionalCost.setIsAvailable(false);
        additionalCostRepository.save(additionalCost);
    }

    public ListResponse<AdditionalCostResponse> getUnrecordedAdditionalCost(
            String roomId,
            AdditionalCostUnrecordedRequest request
    ) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        Optional<Invoice> invoiceOptional = invoiceRepositoty.findByMonthAndYearAndRoom(
                request.getMonth(),
                request.getYear(),
                room
        );

        if (invoiceOptional.isPresent()) {
            if (!invoiceOptional.get().getPendingInvoice()) {
                throw new AppException(ErrorCode.INVOICE_COMPLETED);
            }
        }

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!userId.equals(room.getRoomType().getApartment().getUserId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        List<AdditionalCost> additionalCosts = additionalCostRepository.findUnrecordedAdditionalCosts(
                room.getRoomType().getApartment(),
                roomId,
                request.getMonth(),
                request.getYear()
        );

        return ListResponse.<AdditionalCostResponse>builder()
                .data(additionalCosts.stream()
                        .map(AdditionalCostMapper::additionalCostToAdditionalCostResponse)
                        .toList())
                .totalElement((long) additionalCosts.size())
                .totalPage(1)
                .build();
    }

    public AdditionalCostResponse updateAdditionalCost(AdditionalCostUpdateRequest request) {

        AdditionalCost additionalCost = additionalCostRepository
                .findById(request.getAdditionalCostId())
                .orElseThrow(() -> new AppException(ErrorCode.ADDITIONAL_COST_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        if (authorities.stream()
                .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
            if (!additionalCost.getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        AdditionalCostType additionalCostType = additionalCostTypeRepository.findById(request.getAdditionalCostType())
                .orElseThrow(() -> new AppException(ErrorCode.ADDITIONAL_COST_TYPE_NOT_FOUND));

        additionalCost.setCost(request.getCost());
        additionalCost.setName(request.getName());
        additionalCost.setAdditionalCostType(additionalCostType);
        additionalCost.setUnit(request.getUnit());


        additionalCostRepository.save(additionalCost);

        return AdditionalCostMapper.additionalCostToAdditionalCostResponse(additionalCost);
    }

    public AdditionalCostResponse getAdditionalCost(String additionalCostId) {
        AdditionalCost additionalCost = additionalCostRepository
                .findById(additionalCostId)
                .orElseThrow(() -> new AppException(ErrorCode.ADDITIONAL_COST_NOT_FOUND));

        return AdditionalCostMapper.additionalCostToAdditionalCostResponse(additionalCost);
    }

    public ListResponse<AdditionalCostResponse> getAllAdditionalCost(
            int pageNum, int pageSize, String sortBy, String order, String search, String apartmentId, String additionalCostType) {

//        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
//        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);
//
//        Page<AdditionalCost> additionalCosts =
//                additionalCostRepository.findAllAdditionalCost(search, additionalCostType, apartmentId, pageable);
//
//        return ListResponse.<AdditionalCostResponse>builder()
//                .totalPage(additionalCosts.getTotalPages())
//                .totalElement(additionalCosts.getTotalElements())
//                .data(additionalCosts.stream()
//                        .map(AdditionalCostMapper::additionalCostToAdditionalCostResponse)
//                        .toList())
//                .build();
        return null;
    }
}
