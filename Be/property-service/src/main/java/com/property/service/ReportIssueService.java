package com.property.service;

import com.event.dto.CreateNotificationEvent;
import com.property.constant.ReportIssueStatus;
import com.property.dto.request.ReportIssueRequest;
import com.property.dto.request.ReportIssueUpdateRequest;
import com.property.dto.response.ListResponse;
import com.property.dto.response.ReportIssueResponse;
import com.property.entity.Apartment;
import com.property.entity.ReportIssue;
import com.property.entity.Room;
import com.property.entity.Tenant;
import com.property.exception.AppException;
import com.property.exception.ErrorCode;
import com.property.mapper.ReportIssueMapper;
import com.property.repository.ApartmentRepository;
import com.property.repository.ReportIssueRepository;
import com.property.repository.RoomRepository;
import com.property.repository.TenantRepository;
import com.property.repository.specification.ReportedIssueSpecifications;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportIssueService {
    ReportIssueRepository reportIssueRepository;
    TenantRepository tenantRepository;
    RoomRepository roomRepository;
    ApartmentRepository apartmentRepository;

    KafkaTemplate<String, Object> kafkaTemplate;

    public ReportIssueResponse createReportIssue(ReportIssueRequest request) {

        ReportIssue reportIssue = ReportIssueMapper.toReportIssue(request);

        var auth = SecurityContextHolder.getContext().getAuthentication();

        List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(request.getRoomId());

        if (tenantList.stream().map(Tenant::getTenantId).noneMatch(auth.getName()::equals)) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        Room room = roomRepository.findById(request.getRoomId())
                .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));
        reportIssue.setTenantId(auth.getName());
        reportIssue.setLandlordId(room.getRoomType().getApartment().getUserId());
        reportIssue.setStatus(ReportIssueStatus.PENDING.toString());
        reportIssue.setRoom(room);

        kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                .recipient(reportIssue.getLandlordId())
                .message("Bạn có một yêu cầu báo cáo mới từ người thuê phòng: "
                        + room.getRoomType().getApartment().getName()
                        + " - Dãy trọ: "
                        + room.getRoomType().getApartment().getName()
                        + " - loại phòng: "
                        + room.getRoomType().getName()
                        + " - phòng: "
                        + room.getName())
                .title("Bạn có một yêu cầu báo cáo mới")
                .build());


        return ReportIssueMapper.toReportIssueResponse(
                reportIssueRepository.save(reportIssue),
                reportIssue.getRoom()
        );
    }

    public ReportIssueResponse updateReportIssue(ReportIssueUpdateRequest request) {

        ReportIssue reportIssue = reportIssueRepository.findById(request.getReportIssueId())
                .orElseThrow(() -> new AppException(ErrorCode.REPORT_ISSUE_NOT_FOUND));

        var auth = SecurityContextHolder.getContext().getAuthentication();

        log.info("auth: {}", auth.getName());
        log.info("reportIssue: {}", reportIssue.getLandlordId());

        if (!auth.getName().equals(reportIssue.getLandlordId())) {
            if (!reportIssue.getTenantId().equals(auth.getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }
        reportIssue.setStatus(request.getStatus());

        if (request.getStatus().equals(ReportIssueStatus.RESOLVED.toString())) {
            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(reportIssue.getTenantId())
                    .message("Yêu cầu báo cáo " + reportIssue.getStatus() + " của bạn đã được giải quyết")
                    .title("Yêu cầu báo cáo đã được giải quyết")
                    .build());

            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(reportIssue.getLandlordId())
                    .message("Yêu cầu báo cáo " + reportIssue.getTitle() + " đã được giải quyết")
                    .title("Yêu cầu báo cáo" + reportIssue.getStatus() + " đã được giải quyết")
                    .build());
        } else if (request.getStatus().equals(ReportIssueStatus.IN_PROGRESS.toString())) {
            kafkaTemplate.send("create-notification", CreateNotificationEvent.builder()
                    .recipient(reportIssue.getTenantId())
                    .message("Yêu cầu báo cáo " + reportIssue.getStatus() + " của bạn đang được xử lý")
                    .title("Yêu cầu báo cáo đang được xử lý")
                    .build());
        }

        return ReportIssueMapper.toReportIssueResponse(reportIssueRepository.save(reportIssue),
                reportIssue.getRoom());

    }

    public ListResponse<ReportIssueResponse> getReportedIssues(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String status,
            String roomId,
            String apartmentId,
            String userId,
            String landlordId,
            String search
    ) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by(Sort.Direction.fromString(order), sortBy));

        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (!roomId.isEmpty() || !apartmentId.isEmpty()) {

            if (!roomId.isEmpty()) {
                Room room = roomRepository.findById(roomId)
                        .orElseThrow(() -> new AppException(ErrorCode.ROOM_NOT_FOUND));

                if (!room.getRoomType().getApartment().getUserId().equals(auth.getName())) {
                    List<Tenant> tenantList = tenantRepository.findALlTenantByRoomIdAndIsAAndIsAvailableTrue(roomId);
                    log.info(roomId);
                    log.info("tenantList: {}", tenantList);
                    if (tenantList.stream().map(Tenant::getTenantId).noneMatch(auth.getName()::equals)) {
                        log.info("tenantId: {}", auth.getName());
                        throw new AppException(ErrorCode.UNAUTHORIZED);
                    }
                }
            }
            if (!apartmentId.isEmpty()) {
                Apartment apartment = apartmentRepository.findById(apartmentId)
                        .orElseThrow(() -> new AppException(ErrorCode.APARTMENT_NOT_FOUND));

                if (!apartment.getUserId().equals(auth.getName())) {
                    throw new AppException(ErrorCode.UNAUTHORIZED);
                }
            }

        }

        if (!userId.isEmpty()) {
            if (!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        if (!landlordId.isEmpty()) {
            if (!landlordId.equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        log.info("landlordId: {}", landlordId);

        Page<ReportIssue> reportIssuePage = getAllReportedIssues(
                status, roomId, apartmentId, userId,
                landlordId, search, pageable
        );
        log.info("1");

        return ListResponse.<ReportIssueResponse>builder()
                .data(reportIssuePage.map(reportIssue ->
                        ReportIssueMapper.toReportIssueResponse(
                                reportIssueRepository.save(reportIssue),
                                reportIssue.getRoom())).getContent())
                .totalElement(reportIssuePage.getTotalElements())
                .totalPage(reportIssuePage.getTotalPages())
                .build();
    }

    Page<ReportIssue> getAllReportedIssues(
            String status,
            String roomId,
            String apartmentId,
            String userId,
            String landlordId,
            String search,
            Pageable pageable
    ) {
        log.info("1");

        Specification<ReportIssue> specification = Specification.where(ReportedIssueSpecifications.withLandlordId(landlordId))
                .and(ReportedIssueSpecifications.withRoomId(roomId))
                .and(ReportedIssueSpecifications.withStatus(status))
                .and(ReportedIssueSpecifications.withTenantId(userId)
                        .and(ReportedIssueSpecifications.withSearch(search))
                        .and(ReportedIssueSpecifications.withApartmentId(apartmentId))
                );

        return reportIssueRepository.findAll(specification, pageable);
    }

}
