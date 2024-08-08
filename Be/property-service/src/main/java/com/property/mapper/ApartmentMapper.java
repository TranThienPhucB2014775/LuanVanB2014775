package com.property.mapper;


import com.property.constant.ApartmentTypes;
import com.property.dto.request.apartmentCreationRequest;
import com.property.dto.request.apartmentUpdateRequest;
import com.property.dto.response.ApartmentResponse;
import com.property.entity.Apartment;

public class ApartmentMapper {

    public static ApartmentResponse apartmentToApartmentResponse(Apartment apartment) {
        return ApartmentResponse.builder()
                .apartmentId(apartment.getApartmentId())
                .city(apartment.getCity())
                .address(apartment.getAddress())
                .rule(apartment.getRule())
                .utility(apartment.getUtility())
                .description(apartment.getDescription())
                .isAvailable(apartment.getIsAvailable())
                .apartmentType(apartment.getApartmentType().getName())
                .build();
    }

    public static Apartment creationApartmentRequestToApartment(
            apartmentCreationRequest creationApartmentRequest
    ) {
        return Apartment.builder()
                .city(creationApartmentRequest.getCity())
                .address(creationApartmentRequest.getAddress())
                .rule(creationApartmentRequest.getRule())
                .utility(creationApartmentRequest.getUtility())
                .description(creationApartmentRequest.getDescription())
                .build();
    }

    public static Apartment updateApartmentRequestToApartment(
            apartmentUpdateRequest updateApartmentRequest) {
        return Apartment.builder()
                .apartmentId(updateApartmentRequest.getApartmentId())
                .city(updateApartmentRequest.getCity())
                .address(updateApartmentRequest.getAddress())
                .rule(updateApartmentRequest.getRule())
                .utility(updateApartmentRequest.getUtility())
                .description(updateApartmentRequest.getDescription())
                .build();
    }
}
