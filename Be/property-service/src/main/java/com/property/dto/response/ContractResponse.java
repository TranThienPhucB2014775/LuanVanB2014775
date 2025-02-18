package com.property.dto.response;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContractResponse {

    String contractId;

    String roomId;

    String roomName;

    String roomTypeId;

    String apartmentId;

    String landlordId;

    String description;

    Instant startDate;

    Instant expectedEndDate;

    Instant actualEndDate;

    BigDecimal price;

    BigDecimal depositAmount;

    Boolean isAvailable;
}
