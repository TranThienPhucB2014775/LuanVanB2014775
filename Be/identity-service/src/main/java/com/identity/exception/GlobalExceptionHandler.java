package com.identity.exception;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.identity.dto.ApiResponse;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private static final String MIN_ATTRIBUTE = "min";

    @Value("${error.code}")
    private int codeError;

    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse> handlingRuntimeException(RuntimeException exception) {
        log.error("Exception: ", exception);
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode() );
        apiResponse.setResult(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handlingAppException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(errorCode.getCode() + codeError);
        apiResponse.setResult(errorCode.getMessage());

        return ResponseEntity.status(errorCode.getStatusCode()).body(apiResponse);
    }

    //    @ExceptionHandler(value = AuthorizationDeniedException.class)
    //    ResponseEntity<ApiResponse> handlingAuthorizationDeniedException(AuthorizationDeniedException exception) {
    //        ApiResponse apiResponse = new ApiResponse();
    //
    //        apiResponse.setCode(ErrorCode.AUTHORIZATION_DENIED.getCode());
    //        apiResponse.setResult(ErrorCode.AUTHORIZATION_DENIED.getMessage());
    //
    //        return ResponseEntity.status(ErrorCode.AUTHORIZATION_DENIED.getStatusCode()).body(apiResponse);
    //    }

    @ExceptionHandler(value = FeignException.class)
    ResponseEntity<ApiResponse> handlingFeignException(FeignException exception) {
        log.info("FeignException: ", exception.contentUTF8());
        try {
            ObjectMapper mapper = new ObjectMapper();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(mapper.readValue(exception.contentUTF8(), ApiResponse.class));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @ExceptionHandler(value = DataIntegrityViolationException.class)
    ResponseEntity<ApiResponse> handlingDataIntegrityViolationException(DataIntegrityViolationException exception) {
        ApiResponse apiResponse = new ApiResponse();

        apiResponse.setCode(ErrorCode.EMAIL_EXIST.getCode() + codeError);
        apiResponse.setResult(ErrorCode.EMAIL_EXIST.getMessage());

        return ResponseEntity.badRequest().body(apiResponse);
    }

    //    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    //    ResponseEntity<ApiResponse> handlingValidation(MethodArgumentNotValidException exception) {
    //        String enumKey = exception.getFieldError().getDefaultMessage();
    //
    //        ErrorCode errorCode = ErrorCode.INVALID_KEY;
    //        Map<String, Object> attributes = null;
    //        try {
    //            errorCode = ErrorCode.valueOf(enumKey);
    //
    //            var constraintViolation =
    //                    exception.getBindingResult().getAllErrors().getFirst().unwrap(ConstraintViolation.class);
    //
    //            attributes = constraintViolation.getConstraintDescriptor().getAttributes();
    //
    //            log.info(attributes.toString());
    //
    //        } catch (IllegalArgumentException e) {
    //
    //        }
    //
    //        ApiResponse apiResponse = new ApiResponse();
    //
    //        apiResponse.setCode(errorCode.getCode());
    //        apiResponse.setResult(
    //                Objects.nonNull(attributes)
    //                        ? mapAttribute(errorCode.getMessage(), attributes)
    //                        : errorCode.getMessage());
    //
    //        return ResponseEntity.badRequest().body(apiResponse);
    //    }

    private String mapAttribute(String message, Map<String, Object> attributes) {
        String minValue = String.valueOf(attributes.get(MIN_ATTRIBUTE));

        return message.replace("{" + MIN_ATTRIBUTE + "}", minValue);
    }
}
