package com.property.service;

import java.text.ParseException;
import java.time.Instant;
import java.time.ZoneId;
import java.util.*;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.event.dto.CreateNotificationEvent;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.property.config.CustomJwtDecoder;
import com.property.constant.InvitationStatus;
import com.property.constant.RentStatus;
import com.property.dto.request.AcceptInviteRequest;
import com.property.dto.request.DisableInviteRequest;
import com.property.dto.request.InviteTenantToRoomRequest;
import com.property.dto.request.RefuseInviteRequest;
import com.property.dto.response.InvitationResponse;
import com.property.dto.response.ListResponse;
import com.property.dto.response.UserResponse;
import com.property.entity.*;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.InvitationMapper;
import com.property.repository.ContractRepository;
import com.property.repository.InvitationRepository;
import com.property.repository.RoomRepository;
import com.property.repository.TenantRepository;
import com.property.repository.specification.InvitationSpecifications;
import com.property.service.client.UserClient;

import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@ToString
public class InvitationService {

    InvitationRepository invitationRepository;
    RoomRepository roomRepository;
    ContractRepository contractRepository;
    TenantRepository tenantRepository;

    DateTimeFormatter dateTimeFormatter;
    DateTimeFormatterFuture dateTimeFormatterFuture;
    UserClient userClient;

    CustomJwtDecoder customJwtDecoder;

    @NonFinal
    @Value("${jwt.inviteRoom.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.inviteRoom.valid-duration}")
    protected long VALID_DURATION;

    KafkaTemplate<String, Object> kafkaTemplate;

    public Invitation createInvitation(Invitation invitation) {
        return invitationRepository.save(invitation);
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public InvitationResponse inviteTenant(InviteTenantToRoomRequest request, String token) {

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        UserResponse userResponse = null;

        try {
            Room room = roomRepository
                    .findById(request.getRoomId())
                    .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

            if (!room.getIsAvailable()) {
                throw new AppException(ErrorCode.ROOM_NOT_AVAILABLE);
            }

            UserResponse landlord = userClient
                    .getUserByUserId(authentication.getName(), "Bearer " + token)
                    .getResult();
            if (!landlord.getIsVerified()) {
                throw new AppException(ErrorCode.LANDLORD_NOT_VERIFIED);
            }

            if (request.getEmail() == null) {
                userResponse = userClient
                        .getUserByUserId(request.getUserId(), "Bearer " + token)
                        .getResult();
            } else {
                userResponse = userClient
                        .getUserByEmail(request.getEmail(), "Bearer " + token)
                        .getResult();
            }

            if (!userResponse.getIsVerified()) {
                throw new AppException(ErrorCode.USER_NOT_VERIFIED);
            }

            if (room.getCurrentOccupancy() == room.getRoomType().getMaxOccupancy()) {
                throw new AppException(ErrorCode.ROOM_FULL);
            }

            if (!room.getRoomType().getApartment().getUserId().equals(authentication.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }

            //            Instant newInstant = request.getEndDate().atZone(ZoneId.of("UTC"))
            //                    .toLocalDate()
            //                    .atStartOfDay(ZoneId.of("UTC"))
            //                    .toInstant();

            //            Instant newInstant = LocalDate.ofInstant(request.getEndDate(), ZoneId.systemDefault())
            //                    .atStartOfDay(ZoneId.systemDefault())
            //                    .toInstant();

            Instant newInstant = request.getEndDate()
                    .atZone(ZoneId.of("UTC"))
                    .withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"))
                    .toLocalDate()
                    .atTime(23, 59, 59)
                    .atZone(ZoneId.of("Asia/Ho_Chi_Minh"))
                    .toInstant();

            log.info("newInstant: {}", newInstant);
            log.info("startDate: {}", request.getEndDate());

            Invitation invitation = createInvitation(Invitation.builder()
                    .invitationStatus(InvitationStatus.PENDING.toString())
                    .inviteToken(generateTokenInvite(
                            request.getRoomId(),
                            authentication.getName(),
                            request.getStartDate(),
                            newInstant,
                            new Date(System.currentTimeMillis() + VALID_DURATION)))
                    .message(request.getMessage())
                    .room(room)
                    .tenantId(userResponse.getId())
                    .landlordId(authentication.getName())
                    .price(request.getPrice())
                    .depositAmount(request.getDepositAmount())
                    .build());
            return InvitationMapper.mapToInvitationResponse(invitation, request.getStartDate(), request.getEndDate());

        } catch (FeignException e) {
            log.error("Cannot get user {}", e.toString());
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }
    }

    public void refuseInvite(RefuseInviteRequest request) {
        log.info(request.getInviteToken());

        Invitation invitation = invitationRepository
                .findByInviteToken(request.getInviteToken())
                .orElseThrow(() -> new AppException(ErrorCode.INVITATION_NOT_FOUND));

        if (!invitation.getInvitationStatus().equals(InvitationStatus.PENDING.toString())) {
            throw new AppException(ErrorCode.INVITATION_NOT_PENDING);
        }

        if (!validateTokenInvite(request.getInviteToken())) {
            throw new AppException(ErrorCode.INVALID_INVITATION_TOKEN);
        }

        var tenantId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!invitation.getTenantId().equals(tenantId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        invitation.setInvitationStatus(InvitationStatus.REFUSED.toString());
        invitationRepository.save(invitation);

        kafkaTemplate.send(
                "create-notification",
                CreateNotificationEvent.builder()
                        .recipient(invitation.getLandlordId())
                        .message("Người thuê " + tenantId + " đã từ chối lời mời của bạn")
                        .title("Người thuê đã từ chối lời mời")
                        .build());
    }

    @PreAuthorize("hasRole('ROLE_LANDLORD')")
    public void disableInvite(DisableInviteRequest request) {
        log.info(request.getInviteToken());
        Invitation invitation = invitationRepository
                .findByInviteToken(request.getInviteToken())
                .orElseThrow(() -> new AppException(ErrorCode.INVITATION_NOT_FOUND));

        if (!invitation.getInvitationStatus().equals(InvitationStatus.PENDING.toString())) {
            throw new AppException(ErrorCode.INVITATION_NOT_PENDING);
        }

        if (!validateTokenInvite(request.getInviteToken())) {
            throw new AppException(ErrorCode.INVALID_INVITATION_TOKEN);
        }

        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (!invitation.getLandlordId().equals(authentication.getName())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        invitation.setInvitationStatus(InvitationStatus.DISABLED.toString());
        invitationRepository.save(invitation);
    }

    public void acceptInvite(AcceptInviteRequest request) {
        Invitation invitation = invitationRepository
                .findByInviteToken(request.getInviteToken())
                .orElseThrow(() -> new AppException(ErrorCode.INVITATION_NOT_FOUND));

        if (!invitation.getInvitationStatus().equals(InvitationStatus.PENDING.toString())) {
            throw new AppException(ErrorCode.INVITATION_NOT_PENDING);
        }

        if (!validateTokenInvite(request.getInviteToken())) {
            throw new AppException(ErrorCode.INVALID_INVITATION_TOKEN);
        }

        var authentication = customJwtDecoder.decode(request.getInviteToken());

        Map<String, Object> claims = authentication.getClaims();

        Room room = roomRepository
                .findById(claims.get("roomId").toString())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

        if (room.getCurrentOccupancy() == room.getRoomType().getMaxOccupancy()) {
            throw new AppException(ErrorCode.ROOM_FULL);
        }

        var tenantId = SecurityContextHolder.getContext().getAuthentication().getName();

        if (!invitation.getTenantId().equals(tenantId)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        invitation.setInvitationStatus(InvitationStatus.ACCEPTED.toString());

        Optional<Contract> contractOptional = contractRepository.findByLandlordIdAndRoomIdAndIsAvailable(
                invitation.getLandlordId(), claims.get("roomId").toString(), true);
        Contract contract;
        Tenant tenant = Tenant.builder().isAvailable(true).tenantId(tenantId).build();

        log.info("contractOptional: {}", Instant.parse(claims.get("endDate").toString()));

        if (contractOptional.isPresent()) {
            contract = contractOptional.get();
            tenant.setContract(contract);
        } else {
            contract = Contract.builder()
                    .landlordId(invitation.getLandlordId())
                    .room(roomRepository
                            .findById(claims.get("roomId").toString())
                            .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND)))
                    .startDate(Instant.parse(claims.get("startDate").toString()))
                    .expectedEndDate(Instant.parse(claims.get("endDate").toString()))
                    .price(invitation.getPrice())
                    .description(invitation.getMessage())
                    .isAvailable(true)
                    .depositAmount(invitation.getDepositAmount())
                    .build();

            tenant.setContract(contract);
        }
        contractRepository.save(contract);
        tenantRepository.save(tenant);

        room.setCurrentOccupancy(room.getCurrentOccupancy() + 1);
        room.setRentStatus(RentStatus.RENTED.toString());
        roomRepository.save(room);

        kafkaTemplate.send(
                "create-notification",
                CreateNotificationEvent.builder()
                        .recipient(invitation.getLandlordId())
                        .message("Người thuê đã chấp nhận lời mời vào "
                                + room.getRoomType().getApartment().getName()
                                + " -  "
                                + room.getRoomType().getName()
                                + " - "
                                + room.getName() + " của bạn")
                        .title("Người thuê đã chấp nhận lời mời")
                        .build());
    }

    public ListResponse<InvitationResponse> getInvitationsByUserId(int pageNum, int pageSize) {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        log.info("tenantId: {}", authentication.getName());

        Page<Invitation> invitationPage = invitationRepository.findByTenantId(authentication.getName(), pageable);

        return ListResponse.<InvitationResponse>builder()
                .data(invitationPage.stream()
                        .map(invitation -> {
                            var decoded = customJwtDecoder.decode(invitation.getInviteToken());
                            Map<String, Object> claims = decoded.getClaims();
                            return InvitationMapper.mapToInvitationResponse(
                                    invitation,
                                    Instant.parse(claims.get("startDate").toString()),
                                    Instant.parse(claims.get("endDate").toString()));
                        })
                        .toList())
                .totalPage(invitationPage.getTotalPages())
                .totalElement(invitationPage.getTotalElements())
                .build();
    }

    public ListResponse<InvitationResponse> getALlInvitations(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String search,
            String invitationStatus,
            String userId,
            String apartmentId,
            String roomTypeId,
            String roomId) {
        Sort sort = Sort.by(Sort.Direction.fromString(order), sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        var auth = SecurityContextHolder.getContext().getAuthentication();
        if (!roomId.isEmpty() || !roomTypeId.isEmpty() || !apartmentId.isEmpty()) {
            if (auth.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                Room room =
                        roomRepository.findById(roomId).orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
                if (!roomId.isEmpty()) {
                    log.info("1");
                    if (!room.getRoomType().getApartment().getUserId().equals(auth.getName())) {
                        log.info("1");
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                    }
                }
                if (!roomTypeId.isEmpty()) {
                    log.info("2");
                    if (room.getRoomType().getApartment().getUserId().equals(auth.getName())) {
                        log.info("2");
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                    }
                }
                if (!apartmentId.isEmpty()) {
                    log.info("3");
                    if (room.getRoomType().getApartment().getUserId().equals(auth.getName())) {
                        log.info("3");
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                    }
                }
            } else {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        Page<Invitation> invitationPage =
                searchApartments(search, invitationStatus, userId, apartmentId, roomTypeId, roomId, pageable);

        for (Invitation invitation : invitationPage) {
            log.info("invitation: {}", invitation.toString());
        }

        return ListResponse.<InvitationResponse>builder()
                .data(invitationPage.stream()
                        .map(invitation -> {
                            var decoded = customJwtDecoder.decode(invitation.getInviteToken());

                            Map<String, Object> claims = decoded.getClaims();

                            return InvitationMapper.mapToInvitationResponse(
                                    invitation,
                                    Instant.parse(claims.get("startDate").toString()),
                                    Instant.parse(claims.get("endDate").toString()));
                        })
                        .toList())
                .totalPage(invitationPage.getTotalPages())
                .totalElement(invitationPage.getTotalElements())
                .build();
    }

    public Page<Invitation> searchApartments(
            String search,
            String invitationStatus,
            String userId,
            String apartmentId,
            String roomTypeId,
            String roomId,
            Pageable pageable) {

        Specification<Invitation> specification = Specification.where(InvitationSpecifications.withSearch(search))
                .and(InvitationSpecifications.withInvitationStatus(invitationStatus))
                .and(InvitationSpecifications.withUserId(userId))
                .and(InvitationSpecifications.withApartmentId(apartmentId))
                .and(InvitationSpecifications.withRoomTypeId(roomTypeId))
                .and(InvitationSpecifications.withRoomId(roomId));

        return invitationRepository.findAll(specification, pageable);
    }

    private String generateTokenInvite(
            String roomId, String landLordId, Instant startDate, Instant endDate, Date date) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        log.info("startDate: {}", date);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(landLordId)
                .issuer("b201475")
                .issueTime(new Date())
                .expirationTime(date)
                .jwtID(UUID.randomUUID().toString())
                .claim("roomId", roomId)
                .claim("startDate", startDate.toString())
                .claim("endDate", endDate.toString())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private boolean validateTokenInvite(String token) {
        try {

            JWSObject jwsObject = JWSObject.parse(token);

            JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

            if (!jwsObject.verify(verifier)) {
                return false;
            }

            JWTClaimsSet claimsSet = JWTClaimsSet.parse(jwsObject.getPayload().toJSONObject());

            Date expirationTime = claimsSet.getExpirationTime();
            if (expirationTime == null || expirationTime.before(new Date())) {
                return false;
            }

            return true;
        } catch (ParseException | JOSEException e) {
            log.error("Cannot validate token", e);
            return false;
        }
    }
}
