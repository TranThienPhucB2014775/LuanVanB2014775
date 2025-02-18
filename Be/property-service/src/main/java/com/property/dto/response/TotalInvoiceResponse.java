package com.property.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class TotalInvoiceResponse {

    BigDecimal total;
    int month;
    int year;
    Boolean isPaid;

    public TotalInvoiceResponse(BigDecimal total, int month, int year, Boolean isPaid) {
        this.total = total;
        this.month = month;
        this.year = year;
        this.isPaid = false;
    }
}
