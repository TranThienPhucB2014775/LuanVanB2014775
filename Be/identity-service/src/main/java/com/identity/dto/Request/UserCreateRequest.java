package com.identity.dto.Request;

import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserCreateRequest {
    @Size(min = 6,max = 50, message = "USERNAME_INVALID")
    String userName;

    @Size(min = 8, message = "Email_INVALID")
    String email;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String password;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String confirmPassword;

    String city;
    String address;
}
