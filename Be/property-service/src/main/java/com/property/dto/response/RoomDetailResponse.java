package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@Builder
public class RoomDetailResponse {

    String name;

    Boolean isAvailable;

    String rentStatus;
    String roomId;
    int currentOccupancy;

    Set<TenantResponse> tenants;

    Set<InvoiceResponse> invoices;

}
