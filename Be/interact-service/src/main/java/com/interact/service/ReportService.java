package com.interact.service;

import com.event.dto.ReportCreationEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.interact.dto.request.ReportCreationRequest;
import com.interact.dto.response.ListResponse;
import com.interact.dto.response.ReportResponse;
import com.interact.entity.Report;
import com.interact.exception.AppException;
import com.interact.exception.ErrorCode;
import com.interact.mapper.ReportMapper;
import com.interact.repository.ReportRepository;
import com.interact.repository.specification.ReportSpecification;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.Collection;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ReportService {

    ReportRepository reportRepository;

    public void createReport(ReportCreationEvent request) {
        log.info("Creating reportttttt {}", request);

        Report report = ReportMapper.toReport(request, request.getUserId());
        log.info("Creating reportttttt {}", request);

        try {
            reportRepository.save(report);
        } catch (Exception e) {
            log.error("Error creating report {}", e.toString());
        }
//        reportRepository.save(report);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void updateReport(String reportId) {
        log.info("Updating report");

        Report report =
                reportRepository.findById(reportId).orElseThrow(() -> new AppException(ErrorCode.REPORT_NOT_FOUND));

        report.setIsHandled(true);
        reportRepository.save(report);
    }

    public ListResponse<ReportResponse> getAllReports(
            int pageNum,
            int pageSize,
            String sortBy,
            String order,
            String userId,
            String itemId,
            Boolean isHandled,
            String reportType,
            String search) {

        if (userId.isEmpty()) {
            var authentication = SecurityContextHolder.getContext().getAuthentication();

            Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
            if (authorities.stream()
                    .noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
                throw new AppException(ErrorCode.UNAUTHORIZED);
            }
        }

        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Report> reports = getReports(pageable, userId, itemId, isHandled, reportType, search);

        log.info("Getting all reports");
        return ListResponse.<ReportResponse>builder()
                .totalPage(reports.getTotalPages())
                .totalElement(reports.getTotalElements())
                .data(reports.stream().map(ReportMapper::toReportResponse).toList())
                .build();
    }

    private Page<Report> getReports(
            Pageable pageable, String userId, String itemId, Boolean isHandled, String reportType, String search) {

        Specification<Report> specification = Specification.where(ReportSpecification.withSearch(search))
                .and(ReportSpecification.withUserId(userId))
                .and(ReportSpecification.withItemId(itemId))
                .and(ReportSpecification.withIsHandled(isHandled))
                .and(ReportSpecification.withReportType(reportType));

        return reportRepository.findAll(specification, pageable);
    }
}
