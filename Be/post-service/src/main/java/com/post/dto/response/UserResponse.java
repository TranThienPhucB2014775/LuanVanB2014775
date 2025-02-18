package com.post.dto.response;

import java.time.Instant;
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
    Instant createdDate;
    String imgAvatar;
    String facebook;
    String phoneNumber;
    String role;
    String aboutMe;
    Boolean isVerified;
}
