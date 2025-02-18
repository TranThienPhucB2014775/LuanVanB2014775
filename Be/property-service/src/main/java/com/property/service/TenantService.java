package com.property.service;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.event.dto.CreateNotificationEvent;
import com.property.constant.RentStatus;
import com.property.dto.request.CreateNotificationToTenant;
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
    private final InvoiceService invoiceService;

    public ListResponse<TenantRoomResponse> getAllRentalRoomsForTenant(
            int pageNum, int pageSize, String sortBy, String order, Boolean isAvailable) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Tenant> tenants = tenantRepository.findByTenantIdAndIsAvailable(userId, isAvailable, pageable);

        return ListResponse.<TenantRoomResponse>builder()
                .totalPage(tenants.getTotalPages())
                .totalElement(tenants.getTotalElements())
                .data(tenants.stream()
                        .map(tenant -> {
                            return RoomMapper.roomToTenantRoomResponse(
                                    tenant.getContract().getRoom(), tenant);
                        })
                        .toList())
                .build();
    }

    public ListResponse<TenantResponse> getAllTenantsForRoom(
            int pageNum, int pageSize, String sortBy, String order, String roomId, Boolean isAvailable) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

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
                .data(tenants.stream()
                        .map(tenant -> {
                            log.info(tenant.toString());
                            return TenantResponse.builder()
                                    .userId(tenant.getTenantId())
                                    .startDate(tenant.getCreatedAt().toString())
                                    .endDate(
                                            tenant.getEndDate() == null
                                                    ? "N/A"
                                                    : tenant.getUpdatedAt().toString())
                                    .isAvailable(tenant.getIsAvailable())
                                    .rentalDuration(
                                            tenant.getIsAvailable()
                                                    ? ElapsedTimeCalculator.calculateElapsedTime(
                                                    tenant.getCreatedAt(), Instant.now())
                                                    : ElapsedTimeCalculator.calculateElapsedTime(
                                                    tenant.getCreatedAt(), tenant.getUpdatedAt()))
                                    .build();
                        })
                        .toList())
                .build();
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public ListResponse<TenantWithRoomTypeInfoResponse> getAllTenantsForLandLord(
            int pageNum, int pageSize, String sortBy, String order, Boolean isAvailable) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Tenant> tenants = getTenantsForLandLord(
                SecurityContextHolder.getContext().getAuthentication().getName(), isAvailable, pageable);

        return ListResponse.<TenantWithRoomTypeInfoResponse>builder()
                .totalElement(tenants.getTotalElements())
                .totalPage(tenants.getTotalPages())
                .data(tenants.stream()
                        .map(tenant -> {
                            Optional<Room> room = roomRepository.findById(
                                    tenant.getContract().getRoom().getRoomId());
                            return room.map(value -> new TenantWithRoomTypeInfoResponse(
                                    tenant.getTenantId(),
                                    dateTimeFormatter.format(tenant.getCreatedAt()),
                                    tenant.getCreatedAt(),
                                    tenant.getEndDate() == null ? null : tenant.getEndDate(),
                                    tenant.getIsAvailable(),
                                    value.getRoomType().getName(),
                                    value.getRoomType().getRoomTypeId(),
                                    value.getRoomType().getApartment().getName(),
                                    value.getRoomType().getApartment().getApartmentId(),
                                    value.getName(),
                                    value.getRoomId()
                            )).orElse(null);
                        })
                        .toList())
                .build();
    }

    public void outTenantFromRoom(String roomId) {
        Contract contract = contractRepository
                .findByRoomId(roomId)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_AVAILABLE_IN_CONTRACT));

        if (!contract.getLandlordId()
                .equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }
        var auth = SecurityContextHolder.getContext().getAuthentication();

        Tenant tenant = tenantRepository
                .findTenantByTenantIdAndRoomId(auth.getName(), roomId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_NOT_FOUND));

        tenant.setIsAvailable(false);
        tenantRepository.save(tenant);
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public void inviteTenantToLeaveRoom(String tenantId, String roomId) {
        Contract contract = contractRepository
                .findByRoomIdAndIsAvailable(roomId, true)
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_AVAILABLE_IN_CONTRACT));

        if (!contract.getLandlordId()
                .equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Tenant tenant = tenantRepository
                .findTenantByTenantIdAndRoomId(tenantId, roomId)
                .orElseThrow(() -> new AppException(ErrorCode.TENANT_NOT_FOUND));

        tenant.setIsAvailable(false);
        tenant.setEndDate(Instant.now());
        tenantRepository.save(tenant);

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        room.setCurrentOccupancy(room.getCurrentOccupancy() - 1);
        if (room.getCurrentOccupancy() == 0) {
            log.info("Room is available");
            room.setIsAvailable(true);
            room.setRentStatus(RentStatus.AVAILABLE.toString());
            contract.setIsAvailable(false);
            contractRepository.save(contract);
            invoiceService.completeInvoices(roomId);
        }

        roomRepository.save(room);

        kafkaTemplate.send(
                "create-notification",
                CreateNotificationEvent.builder()
                        .recipient(tenantId)
                        .message("Bạn đã bị chủ nhà yêu cầu rời khỏi "
                                + room.getRoomType().getApartment().getName()
                                + " - "
                                + room.getRoomType().getName()
                                + " - "
                                + room.getName())
                        .build());
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD') or hasRole('ROLE_ADMIN')")
    public void pushNotification(CreateNotificationToTenant request, String userId) {
        log.info("Sending notification to tenant");
        if (!SecurityContextHolder.getContext().getAuthentication().getName().equals(userId)) {
            log.info("User is not landlord");
            var authentication = SecurityContextHolder.getContext().getAuthentication();
            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            if (authorities.stream()
                    .noneMatch(
                            grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        List<String> tenantIds = tenantRepository.findByLandlordId(userId);

        tenantIds.forEach(tenantId -> {
            kafkaTemplate.send(
                    "create-notification",
                    CreateNotificationEvent.builder()
                            .recipient(tenantId)
                            .message(request.getMessage())
                            .build());
        });
    }

    private Page<Tenant> getTenantsForLandLord(String landlordId, Boolean isAvailable, Pageable pageable) {
        Specification<Tenant> specification = Specification.where(TenantSpecifications.withLandlordId(landlordId))
                .and(TenantSpecifications.withAvailability(isAvailable));

        return tenantRepository.findAll(specification, pageable);
    }

    public Boolean isTenantRentingFromLandlord(IsTenantRentingFromLandlordRequest request) {
        return tenantRepository.existsByTenantIdAndLandlordId(request.getTenantId(), request.getLandlordId());
    }
}
