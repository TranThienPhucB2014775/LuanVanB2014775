package com.profile.dto.Request;

import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {
    String profileId;

    @Size(min = 32, message = "INVALID_USER_ID")
    String city;

    String address;
}
