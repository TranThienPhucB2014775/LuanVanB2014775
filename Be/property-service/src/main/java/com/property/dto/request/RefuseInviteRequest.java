package com.property.dto.request;

import jakarta.validation.constraints.NotNull;

import lombok.Getter;

@Getter
public class RefuseInviteRequest {

    @NotNull(message = "INVALID_VALUE")
    String inviteToken;
}
