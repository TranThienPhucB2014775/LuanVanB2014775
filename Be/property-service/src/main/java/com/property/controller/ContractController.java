package com.property.controller;

import com.property.dto.request.MoveContractRequest;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.property.dto.ApiResponse;
import com.property.dto.request.DisableContractRequest;
import com.property.dto.response.ContractResponse;
import com.property.dto.response.ListResponse;
import com.property.service.ContractService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/contract")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ContractController {

    ContractService contractService;

    //    @PostMapping
    //    public ResponseEntity<ApiResponse<ContractResponse>> createContract(
    //            @RequestBody @Valid ContractCreationRequest request
    //    ) {
    //        return ResponseEntity.status(HttpStatus.CREATED)
    //                .body(
    //                        ApiResponse.<ContractResponse>builder()
    //                                .result(contractService.createContract(request))
    //                                .build()
    //                );
    //    }

    @PutMapping("/move-contract")
    public ApiResponse<?> moveContract(@RequestBody @Valid MoveContractRequest request) {

        contractService.moveContract(request);
        return ApiResponse.builder()
                .message("Contract moved")
                .build();
    }

    @PutMapping
    public ResponseEntity<?> disableContract(@RequestBody @Valid DisableContractRequest request) {

        contractService.disableContract(request.getContractId());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Contract disabled");
    }

    @GetMapping("/{roomId}/room")
    public ResponseEntity<ApiResponse<ContractResponse>> getContract(@PathVariable String roomId) {
        return ResponseEntity.ok(ApiResponse.<ContractResponse>builder()
                .result(contractService.getContract(roomId))
                .build());
    }

    @GetMapping("/{contractId}")
    public ResponseEntity<ApiResponse<ContractResponse>> getContractByRoom(@PathVariable String contractId) {
        return ResponseEntity.ok(ApiResponse.<ContractResponse>builder()
                .result(contractService.getContractById(contractId))
                .build());
    }

    @GetMapping("/{pageNum}/all")
    public ResponseEntity<ApiResponse<ListResponse<ContractResponse>>> getAllContracts(
            @PathVariable int pageNum,
            @RequestParam(defaultValue = "10", required = false) int pageSize,
            @RequestParam(defaultValue = "createdAt", required = false) String sortBy,
            @RequestParam(defaultValue = "desc", required = false) String order,
            @RequestParam(defaultValue = "true", required = true) Boolean isAvailable) {
        return ResponseEntity.ok(ApiResponse.<ListResponse<ContractResponse>>builder()
                .result(contractService.getContracts(pageNum, pageSize, order, sortBy, isAvailable))
                .build());
    }
}
