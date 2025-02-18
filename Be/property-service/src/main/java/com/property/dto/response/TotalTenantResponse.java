package com.property.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class TotalTenantResponse {
    int month;
    int year;
    long totalTenant;
}
