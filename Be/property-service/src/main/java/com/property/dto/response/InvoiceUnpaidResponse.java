package com.property.dto.response;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class InvoiceUnpaidResponse {
    long totalUnpaidInvoices;
    BigDecimal totalUnpaidAmount;

    public InvoiceUnpaidResponse(long totalUnpaidInvoices, BigDecimal totalUnpaidAmount) {
        if (totalUnpaidAmount == null) {
            totalUnpaidAmount = BigDecimal.ZERO;
        }
        if (totalUnpaidInvoices < 0) {
            totalUnpaidInvoices = 0;
        }
        this.totalUnpaidInvoices = totalUnpaidInvoices;
        this.totalUnpaidAmount = totalUnpaidAmount;
    }
}
