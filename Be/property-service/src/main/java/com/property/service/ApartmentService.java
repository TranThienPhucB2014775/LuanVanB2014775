package com.property.service;

import com.property.config.CustomJwtDecoder;
import com.property.dto.request.apartmentCreationRequest;
import com.property.dto.request.apartmentDeleteAndEnableRequest;
import com.property.dto.request.apartmentUpdateRequest;
import com.property.dto.response.ApartmentResponse;
import com.property.dto.response.ListResponse;
import com.property.entity.Apartment;
import com.property.entity.ApartmentType;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.ApartmentMapper;
import com.property.repository.ApartmentRepository;
import com.property.repository.ApartmentTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@ToString
public class ApartmentService {
    ApartmentRepository apartmentRepository;
    ApartmentTypeRepository apartmentTypeRepositoty;
    CustomJwtDecoder customJwtDecoder;

    public ApartmentResponse getApartment(String apartmentId) {

        return ApartmentMapper.apartmentToApartmentResponse(
                apartmentRepository.findById(apartmentId).orElseThrow(
                        () -> new AppException(ErrorCode.APARTMENT_NOT_FOUND)
                )
        );
    }

    public ApartmentResponse createApartment(apartmentCreationRequest request, String token) {

        ApartmentType apartmentType =
                apartmentTypeRepositoty.findById(
                        request.getApartmentType()).orElseThrow(() -> new AppException(ErrorCode.APARTMENT_TYPE_EXISTED));
        log.info(apartmentType.toString());

        var jwt = customJwtDecoder.decode(token);


        Apartment apartment = ApartmentMapper.creationApartmentRequestToApartment(request);
        apartment.setUserId(jwt.getSubject());
        apartment.setApartmentType(apartmentType);
        apartment.setIsAvailable(true);
        log.info(apartmentType.toString());

        apartmentRepository.save(apartment);

        return ApartmentMapper.apartmentToApartmentResponse(apartment);
    }

    public ApartmentResponse updateApartment(apartmentUpdateRequest request, String token) {

        var jwt = customJwtDecoder.decode(token);
        Apartment apartment = apartmentRepository.findById(
                request.getApartmentId()).orElseThrow(
                () -> new AppException(ErrorCode.APARTMENT_NOT_FOUND)
        );

        if (apartment.getUserId().equals(jwt.getSubject())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        apartment.setCity(request.getCity());
        apartment.setAddress(request.getAddress());
        apartment.setDescription(request.getDescription());
        apartment.setUtility(request.getUtility());
        apartment.setRule(request.getRule());
        if (!request.getApartmentType().equals(apartment.getApartmentType().getName())) {
            ApartmentType apartmentType = apartmentTypeRepositoty.findById(
                    request.getApartmentType()).orElseThrow(() -> new AppException(ErrorCode.APARTMENT_TYPE_EXISTED));
            apartment.setApartmentType(apartmentType);
        }

        apartmentRepository.save(apartment);

        return ApartmentMapper.apartmentToApartmentResponse(apartment);
    }

    public void deleteApartment(String request, String token) {
        var jwt = customJwtDecoder.decode(token);
        Apartment apartment = apartmentRepository.findById(
                request).orElseThrow(
                () -> new AppException(ErrorCode.APARTMENT_NOT_FOUND)
        );

        if (!apartment.getUserId().equals(jwt.getSubject())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        apartment.setIsAvailable(false);

        apartmentRepository.save(apartment);
    }

    public void enableApartment(String request, String token) {
        var jwt = customJwtDecoder.decode(token);
        Apartment apartment = apartmentRepository.findById(
                request).orElseThrow(
                () -> new AppException(ErrorCode.APARTMENT_NOT_FOUND)
        );

        if (!apartment.getUserId().equals(jwt.getSubject())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
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
            String userId
    ) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);
        Page<Apartment> apartments = apartmentRepository.findAllApartments(search, isAvailable, city, userId, pageable);


        return ListResponse.<ApartmentResponse>builder()
                .totalElement(apartments.getTotalElements())
                .totalPage(apartments.getTotalPages())
                .data(apartments.stream()
                        .map(ApartmentMapper::apartmentToApartmentResponse).collect(Collectors.toList()))
                .build();
    }
}
