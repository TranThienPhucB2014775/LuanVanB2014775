package com.property.service;

import com.event.dto.CreateNotificationEvent;
import com.property.constant.RentStatus;
import com.property.dto.request.ContractCreationRequest;
import com.property.dto.response.ContractResponse;
import com.property.dto.response.ListResponse;
import com.property.entity.Contract;
import com.property.entity.Room;
import com.property.entity.Tenant;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.ContractMapper;
import com.property.repository.ContractRepository;
import com.property.repository.RoomRepository;
import com.property.repository.TenantRepository;
import io.swagger.v3.oas.models.info.Contact;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@ToString
public class ContractService {

    ContractRepository contractRepository;
    RoomRepository roomRepository;
    TenantRepository tenantRepository;
    KafkaTemplate<String, Object> kafkaTemplate;

    @NonFinal
    @Value("${contract.expiration.duration}")
    long contractDuration;

    public ContractResponse createContract(ContractCreationRequest request) {

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new AppException((ErrorCode.ROOM_NOT_FOUND)));

        var authentication = SecurityContextHolder.getContext().getAuthentication();


        if (room.getRoomType().getApartment().getUserId().equals(authentication.getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Optional<Contract> contractOptional = contractRepository.findByRoomIdAndIsAvailable(request.getRoomId(), true);

        if (contractOptional.isPresent()) {
            throw new AppException(ErrorCode.CONTRACT_ALREADY_EXISTS);
        }

        ContractResponse contractResponse = ContractMapper.toContractResponse(
                contractRepository.save(ContractMapper.toContract(request, room))
        );
        contractResponse.setApartmentId(room.getRoomType().getApartment().getApartmentId());
        contractResponse.setRoomTypeId(room.getRoomType().getRoomTypeId());

        return contractResponse;
    }

    public void disableContract(
            String contractId
    ) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));

        if (!authentication.getName().equals(contract.getLandlordId())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        contract.setIsAvailable(false);
        contractRepository.save(contract);

        List<Tenant> rooms = tenantRepository.findByContractAndIsAvailable(contract, true);

        for (Tenant tenant : rooms) {
            tenant.setIsAvailable(false);
            tenantRepository.save(tenant);

            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(tenant.getTenantId())
                    .message("Hợp đồng thuê phòng " + tenant.getContract().getRoom().getName() + " đã bị chủ trọ hủy")
                    .build());


        }

        Room room = roomRepository.findById(contract.getRoom().getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        room.setRentStatus(RentStatus.AVAILABLE.toString());
        room.setCurrentOccupancy(0);
        roomRepository.save(room);


    }

    public ContractResponse getContract(
            String roomId
    ) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Contract contract = contractRepository.findByRoomIdAndIsAvailable(roomId, true)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));


        if (!authentication.getName().equals(contract.getLandlordId())) {
            log.info(authentication.getName());
            log.info(contract.getLandlordId());
            List<Tenant> tenants = tenantRepository.findByContractAndIsAvailable(contract, true);

            int tenantIndex = tenants.stream().map(Tenant::getTenantId).toList().indexOf(authentication.getName());

            if (tenantIndex == -1) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            } else if (!tenants.get(tenantIndex).getIsAvailable()) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        ContractResponse contractResponse = ContractMapper.toContractResponse(contract);
        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
        contractResponse.setApartmentId(room.getRoomType().getApartment().getApartmentId());
        contractResponse.setRoomTypeId(room.getRoomType().getRoomTypeId());

        return contractResponse;
    }

    public ContractResponse getContractById(
            String contractId
    ) {
        return ContractMapper.toContractResponse(contractRepository.findById(contractId)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND)));
    }

    public ContractResponse getContractByRoom(
            String roomId
    ) {

        Contract contract = contractRepository.findByRoomIdAndIsAvailable(roomId, true)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND));

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!authentication.getName().equals(contract.getLandlordId())) {
            List<Tenant> tenants = tenantRepository.findByContractAndIsAvailable(contract, true);
            if (tenants.stream().noneMatch(tenant -> tenant.getTenantId().equals(authentication.getName()))) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        } else {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        return ContractMapper.toContractResponse(contractRepository.findByRoomIdAndIsAvailable(roomId, true)
                .orElseThrow(() -> new AppException(ErrorCode.CONTRACT_NOT_FOUND)));
    }

    public ListResponse<ContractResponse> getContracts(
            int pageNum,
            int pageSize,
            String order,
            String sortBy,
            Boolean isAvailable
    ) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Page<Tenant> tenants = tenantRepository.findTenantByTenantIdAndIsAvailable(authentication.getName(), isAvailable, pageable);

        List<ContractResponse> contractResponseList = tenants.stream().map(
                tenant -> {
                    ContractResponse contractResponse = ContractResponse.builder()
                            .contractId(tenant.getContract().getContractId())
                            .roomId(tenant.getContract().getRoom().getRoomId())
                            .startDate(tenant.getContract().getStartDate())
                            .description(tenant.getContract().getDescription())
                            .price(tenant.getContract().getPrice())
                            .depositAmount(tenant.getContract().getDepositAmount())
                            .landlordId(tenant.getContract().getLandlordId())
                            .isAvailable(tenant.getContract().getIsAvailable())
                            .apartmentId(tenant.getContract().getRoom().getRoomType().getApartment().getApartmentId())
                            .build();

                    if (isAvailable) {
                        if (tenant.getContract().getIsAvailable()) {
                            contractResponse.setExpectedEndDate(tenant.getContract().getExpectedEndDate());
                        }
                    } else {
                        if (!tenant.getContract().getIsAvailable()) {
                            contractResponse.setActualEndDate(tenant.getContract().getActualEndDate());
                        }
                    }

                    return contractResponse;
                }).toList();

        return ListResponse.<ContractResponse>builder()
                .totalPage(tenants.getTotalPages())
                .totalElement(tenants.getTotalElements())
                .data(contractResponseList)
                .build();
    }

    public List<Contract> getUpcomingContracts() {
        return contractRepository.getUpcomingContracts(
                Instant.now(),
                Instant.now().plusSeconds(contractDuration * 60 * 60 * 24 * 30)
        );
    }

}
