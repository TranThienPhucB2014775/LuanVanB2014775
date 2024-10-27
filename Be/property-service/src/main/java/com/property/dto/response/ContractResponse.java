package com.property.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
@Builder
public class ContractResponse {

    String contractId;

    String roomId;

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
