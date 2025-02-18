package com.property.dto.response;

import java.util.List;

import lombok.*;

@Getter
@Setter
public class TenantRoomResponse extends RoomResponse {
    String rentalDuration;
    String contractId;

    public TenantRoomResponse(
            String name,
            Boolean isAvailable,
            String rentStatus,
            String roomId,
            int currentOccupancy,
            String landlordId,
            String roomTypeId,
            String apartmentId,
            List<InvoiceResponse> invoiceResponse,
            String rentalDuration,
            String contractId) {
        super(
                name,
                isAvailable,
                rentStatus,
                roomId,
                landlordId,
                currentOccupancy,
                roomTypeId,
                apartmentId,
                invoiceResponse);
        this.rentalDuration = rentalDuration;
        this.contractId = contractId;
    }

    public TenantRoomResponse() {
        super();
    }
}
