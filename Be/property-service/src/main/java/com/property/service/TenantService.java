package com.property.service;

import com.event.dto.CreateNotificationEvent;
import com.property.constant.RentStatus;
import com.property.dto.request.IsTenantRentingFromLandlordRequest;
import com.property.dto.response.*;
import com.property.entity.Contract;
import com.property.entity.Room;
import com.property.entity.Tenant;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.RoomMapper;
import com.property.repository.ContractRepository;
import com.property.repository.RoomRepository;
import com.property.repository.TenantRepository;
import com.property.repository.specification.TenantSpecifications;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class TenantService {

    TenantRepository tenantRepository;
    RoomRepository roomRepository;
    ContractRepository contractRepository;
    DateTimeFormatter dateTimeFormatter;
    DateTimeFormatterFuture dateTimeFormatterFuture;
    ElapsedTimeCalculator elapsedTimeCalculator;

    KafkaTemplate<String, Object> kafkaTemplate;


    public ListResponse<TenantRoomResponse> getAllRentalRoomsForTenant(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            Boolean isAvailable
    ) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Tenant> tenants = tenantRepository.findByTenantIdAndIsAvailable(userId, isAvailable, pageable);

        return ListResponse.<TenantRoomResponse>builder()
                .totalPage(tenants.getTotalPages())
                .totalElement(tenants.getTotalElements())
                .data(tenants.stream().map(
                        tenant -> {
                            return RoomMapper.roomToTenantRoomResponse(
                                    tenant.getContract().getRoom(),
                                    tenant
                            );
                        }
                ).toList())
                .build();
    }

    public ListResponse<TenantResponse> getAllTenantsForRoom(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String roomId,
            Boolean isAvailable
    ) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(roomId);

        if (!userId.equals(room.getRoomType().getApartment().getUserId())) {
            if (tenantList.stream().map(Tenant::getTenantId).noneMatch(userId::equals)) {
                if (!isAvailable) {
                    throw new AppException(ErrorCode.UNAUTHORIZED);
                }
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        Page<Tenant> tenants = tenantRepository.findAllTenants(roomId, isAvailable, pageable);

        return ListResponse.<TenantResponse>builder()
                .totalElement(tenants.getTotalElements())
                .totalPage(tenants.getTotalPages())
                .data(tenants.stream().map(
                                tenant -> {
                                    log.info(tenant.toString());
                                    return TenantResponse.builder()
                                            .userId(tenant.getTenantId())
                                            .startDate(tenant.getCreatedAt().toString())
                                            .endDate(
                                                    tenant.getEndDate() == null
                                                            ? "N/A"
                                                            : tenant.getUpdatedAt().toString()
                                            )
                                            .isAvailable(tenant.getIsAvailable())
                                            .rentalDuration(
                                                    tenant.getIsAvailable()
                                                            ? null
                                                            : ElapsedTimeCalculator.calculateElapsedTime(
                                                            tenant.getCreatedAt(),
                                                            tenant.getUpdatedAt()
                                                    )
                                            )
                                            .build();
                                }
                        ).toList()
                )
                .build();
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public ListResponse<TenantWithRoomTypeInfoResponse> getAllTenantsForLandLord(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            Boolean isAvailable
    ) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Tenant> tenants = getTenantsForLandLord(
                SecurityContextHolder.getContext().getAuthentication().getName(),
                isAvailable,
                pageable
        );

        return ListResponse.<TenantWithRoomTypeInfoResponse>builder()
                .totalElement(tenants.getTotalElements())
                .totalPage(tenants.getTotalPages())
                .data(tenants.stream().map(
                        tenant -> {
                            Optional<Room> room = roomRepository.findById(tenant.getContract().getRoom().getRoomId());
                            if (room.isPresent()) {
                                return new TenantWithRoomTypeInfoResponse(
                                        tenant.getTenantId(),
                                        dateTimeFormatter.format(tenant.getCreatedAt())
                                );
                            }
                            return null;
                        }
                ).toList())
                .build();
    }

    public void outTenantFromRoom(String roomId) {
        Contract contract = contractRepository.findByRoomId(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_AVAILABLE_IN_CONTRACT));

        if (!contract.getLandlordId().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        var auth = SecurityContextHolder.getContext().getAuthentication();

        Tenant tenant = tenantRepository.findTenantByTenantIdAndRoomId(auth.getName(), roomId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_NOT_FOUND));

        tenant.setIsAvailable(false);
        tenantRepository.save(tenant);
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public void inviteTenantToLeaveRoom(String tenantId, String roomId) {
        Contract contract = contractRepository.findByRoomIdAndIsAvailable(roomId, true)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_AVAILABLE_IN_CONTRACT));

        if (!contract.getLandlordId().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Tenant tenant = tenantRepository.findTenantByTenantIdAndRoomId(tenantId, roomId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_NOT_FOUND));

        tenant.setIsAvailable(false);
        tenant.setEndDate(Instant.now());
        tenantRepository.save(tenant);

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        room.setCurrentOccupancy(room.getCurrentOccupancy() - 1);
        if (room.getCurrentOccupancy() == 0) {
            log.info("Room is available");
            room.setIsAvailable(true);
            room.setRentStatus(RentStatus.AVAILABLE.toString());
            contract.setIsAvailable(false);
            contractRepository.save(contract);
        }

        roomRepository.save(room);

        kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                .recipient(tenantId)
                .message("Bạn đã bị chủ nhà yêu cầu rời khỏi "
                        + room.getRoomType().getApartment().getName()
                        + " - "
                        + room.getRoomType().getName()
                        + " - "
                        + room.getName()
                )
                .build());
    }

    private Page<Tenant> getTenantsForLandLord(
            String landlordId,
            Boolean isAvailable,
            Pageable pageable
    ) {
        Specification<Tenant> specification = Specification
                .where(TenantSpecifications.withLandlordId(landlordId))
                .and(TenantSpecifications.withAvailability(isAvailable));

        return tenantRepository.findAll(specification, pageable);
    }

    public Boolean isTenantRentingFromLandlord(IsTenantRentingFromLandlordRequest request) {
        return tenantRepository.existsByTenantIdAndLandlordId(request.getTenantId(), request.getLandlordId());
    }

}
