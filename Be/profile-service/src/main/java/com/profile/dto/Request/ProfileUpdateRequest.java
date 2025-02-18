package com.profile.dto.Request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {

    @Size(min = 6, max = 50, message = "INVALID_USER_ID")
    String userName;

    @Size(min = 4, message = "INVALID_VALUE")
    String city;

    String address;

    @Pattern(regexp = "^(https?://)?(www\\.)?facebook\\.com/?.*$", message = "INVALID_FACEBOOK_URL")
    String facebook;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "INVALID_PHONE_NUMBER") // Thay đổi ở đây
    String phoneNumber;

    @Pattern(regexp = "^[0-9]{10,11}$", message = "INVALID_PHONE_NUMBER") // Thay đổi ở đây
    String zaloPhoneNumber;

    String aboutMe;
}
