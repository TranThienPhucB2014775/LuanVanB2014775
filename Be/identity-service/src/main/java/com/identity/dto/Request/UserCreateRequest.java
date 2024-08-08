package com.identity.dto.Request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import com.identity.constant.Roles;
import com.identity.validate.RolesSubset;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserCreateRequest {
    @Size(min = 6, max = 50, message = "USERNAME_INVALID")
    String userName;

    @Size(min = 8, message = "EMAIL_INVALID")
    @Email(message = "EMAIL_INVALID")
    String email;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String password;

    @Size(min = 6, message = "INVALID_PASSWORD")
    String confirmPassword;

    String city;
    String address;

    @NotNull
    @RolesSubset(
            anyOf = {Roles.LANDLORD, Roles.TENANT},
            message = "ROLE_INVALID")
    String role;
}
