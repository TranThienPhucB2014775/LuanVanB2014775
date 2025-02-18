package com.property.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import com.property.dto.request.InviteTenantToRoomRequest;

public class UserIdOrEmailValidator implements ConstraintValidator<ValidUserIdOrEmail, InviteTenantToRoomRequest> {

    @Override
    public boolean isValid(InviteTenantToRoomRequest request, ConstraintValidatorContext context) {
        if (request == null) {
            return true;
        }
        boolean hasUserId = request.getUserId() != null;
        boolean hasEmail = request.getEmail() != null;
        return (hasUserId && !hasEmail) || (!hasUserId && hasEmail);
    }
}
