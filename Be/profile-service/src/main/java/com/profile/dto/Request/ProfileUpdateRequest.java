package com.profile.dto.Request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProfileUpdateRequest {

    @Size(min = 6,max = 50, message = "INVALID_USER_ID")
    String userName;

    @Size(min = 32, message = "INVALID_USER_ID")
    String city;

    String address;

    @Pattern(regexp = "^(https?://)?(www\\.)?facebook\\.com/?.*$", message = "Invalid Facebook URL")
    String facebook;

    @Pattern(regexp = "^\\+84[0-9]{9}$", message = "Invalid phone number")
    private String phoneNumber;

    @Pattern(regexp = "^\\+84[0-9]{9}$", message = "Invalid phone number")
    private String zaloPhoneNumber;
}
