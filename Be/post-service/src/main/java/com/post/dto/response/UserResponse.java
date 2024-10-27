package com.post.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

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
    String role;
    String aboutMe;
    Boolean isVerified;
}
