package com.property.dto.response;

import java.util.Set;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
