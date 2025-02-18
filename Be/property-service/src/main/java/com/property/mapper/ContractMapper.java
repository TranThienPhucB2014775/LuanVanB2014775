package com.property.mapper;

import com.property.dto.request.ContractCreationRequest;
import com.property.dto.response.ContractResponse;
import com.property.entity.Contract;
import com.property.entity.Room;

public class ContractMapper {

    public static ContractResponse toContractResponse(Contract contract) {
        return ContractResponse.builder()
                .contractId(contract.getContractId())
                .roomId(contract.getRoom().getRoomId())
                .landlordId(contract.getLandlordId())
                .description(contract.getDescription())
                .startDate(contract.getStartDate())
                .expectedEndDate(contract.getExpectedEndDate())
                .actualEndDate(contract.getActualEndDate())
                .price(contract.getPrice())
                .depositAmount(contract.getDepositAmount())
                .isAvailable(contract.getIsAvailable())
                .roomName(contract.getRoom().getName())
                .build();
    }

    public static Contract toContract(ContractCreationRequest request, Room room) {
        return Contract.builder()
                .room(room)
                .landlordId(request.getLandlordId())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .expectedEndDate(request.getExpectedEndDate())
                .actualEndDate(null)
                .price(request.getPrice())
                .depositAmount(request.getDepositAmount())
                .isAvailable(true)
                .build();
    }
}
