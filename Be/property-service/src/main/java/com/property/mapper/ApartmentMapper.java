package com.property.mapper;

import java.util.stream.Collectors;

import com.property.dto.request.ApartmentCreationRequest;
import com.property.dto.request.ApartmentUpdateRequest;
import com.property.dto.response.ApartmentResponse;
import com.property.entity.AdditionalCost;
import com.property.entity.Apartment;

public class ApartmentMapper {

    public static ApartmentResponse apartmentToApartmentResponse(Apartment apartment, int currentOccupancy) {
        return ApartmentResponse.builder()
                .name(apartment.getName())
                .apartmentId(apartment.getApartmentId())
                .userId(apartment.getUserId())
                .city(apartment.getCity())
                .address(apartment.getAddress())
                .rule(apartment.getRule())
                .utility(apartment.getUtility())
                .description(apartment.getDescription())
                .isAvailable(apartment.getIsAvailable())
                .apartmentType(apartment.getApartmentType().getName())
                .additionalCostResponses(
                        apartment.getAdditionalCosts() == null
                                ? null
                                : apartment.getAdditionalCosts().stream()
                                        .filter(AdditionalCost::getIsAvailable)
                                        .map(AdditionalCostMapper::additionalCostToAdditionalCostResponse)
                                        .collect(Collectors.toSet()))
                .currentOccupancy(currentOccupancy)
                .build();
    }

    public static Apartment creationApartmentRequestToApartment(ApartmentCreationRequest creationApartmentRequest) {
        return Apartment.builder()
                .name(creationApartmentRequest.getName())
                .city(creationApartmentRequest.getCity())
                .address(creationApartmentRequest.getAddress())
                .rule(creationApartmentRequest.getRule())
                .utility(creationApartmentRequest.getUtility())
                .description(creationApartmentRequest.getDescription())
                .build();
    }

    public static Apartment updateApartmentRequestToApartment(ApartmentUpdateRequest updateApartmentRequest) {
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
