package com.property.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.response.InvoiceResponse;
import com.property.dto.response.TotalInvoiceResponse;
import com.property.service.InvoiceService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/invoice")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class InvoiceController {

    InvoiceService invoiceService;

    @GetMapping
    public ApiResponse<InvoiceResponse> getInvoice(
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) int month,
            @RequestParam(required = false) int year) {
        return ApiResponse.<InvoiceResponse>builder()
                .result(invoiceService.getInvoice(roomId, month, year))
                .build();
    }

    @PostMapping
    public ResponseEntity<?> completeInvoice(
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) int month,
            @RequestParam(required = false) int year) {

        return ResponseEntity.status(200)
                .body(ApiResponse.<InvoiceResponse>builder()
                        .result(invoiceService.completeInvoice(roomId, month, year))
                        .build());
    }

    @PutMapping
    public ApiResponse<?> updateInvoice(@RequestParam String roomId, @RequestParam int month, @RequestParam int year) {
        invoiceService.updateInvoice(roomId, month, year);
        return ApiResponse.<String>builder().result("Invoice updated").build();
    }

    @GetMapping("/all")
    public ResponseEntity<?> getTotalPriceInvoice(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) String roomTypeId,
            @RequestParam(required = false) String apartmentId) {
        return ResponseEntity.status(200)
                .body(ApiResponse.<TotalInvoiceResponse>builder()
                        .result(invoiceService.totalInvoiceResponse(month, year, roomTypeId, apartmentId))
                        .build());
    }
}
