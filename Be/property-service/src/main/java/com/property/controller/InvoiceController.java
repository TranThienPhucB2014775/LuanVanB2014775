package com.property.controller;

import com.property.dto.ApiResponse;
import com.property.dto.response.InvoiceResponse;
import com.property.service.InvoiceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.swing.text.html.parser.Entity;

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
            @RequestParam(required = false) int year
    ) {
        return ApiResponse.<InvoiceResponse>builder()
                .result(invoiceService.getInvoice(roomId, month, year))
                .build();
    }

    @PostMapping
    public ResponseEntity<?> completeInvoice(
            @RequestParam(required = false) String roomId,
            @RequestParam(required = false) int month,
            @RequestParam(required = false) int year
    ) {
        invoiceService.completeInvoice(roomId, month, year);
        return ResponseEntity
                .status(200)
                .body(ApiResponse.<String>builder()
                        .result("Invoice completed")
                        .build());
    }

}
