package com.identity.dto.Response;

import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AllUserResponse {
    String id;
    String email;
    Boolean Enable;
    String Role;
    LocalDateTime createdDate;
}
