package com.post.service;

import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.post.dto.response.MonthlyPostData;
import com.post.dto.response.SummaryResponse;
import com.post.repository.RentalPostRepository;
import com.post.repository.TenantPostRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class SummaryService {

    RentalPostRepository rentalPostRepository;
    TenantPostRepository tenantPostRepository;

    public SummaryResponse getSummary() {
        return SummaryResponse.builder()
                .totalRentalPost(rentalPostRepository.count())
                .totalTenantPost(tenantPostRepository.count())
                .monthlyRentalPostData(rentalPostRepository.countRentalPostsLast12Months().stream()
                        .map(objects -> MonthlyPostData.builder()
                                .month(objects[0].toString())
                                .postCount((Long) objects[1])
                                .build())
                        .collect(Collectors.toList()))
                .monthlyTenantPostData(tenantPostRepository.countTenantPostsLast12Months().stream()
                        .map(objects -> MonthlyPostData.builder()
                                .month(objects[0].toString())
                                .postCount((Long) objects[1])
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }
}
