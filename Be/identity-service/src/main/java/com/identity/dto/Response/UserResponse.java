package com.identity.dto.Response;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String email;
    String username;
    Boolean Enable;
    String city;
    String address;
    LocalDateTime createdDate;
    String imgAvatar;
    String facebook;
    String phoneNumber;
    String Role;
    //    Set<RoleResponse> roles;
}
