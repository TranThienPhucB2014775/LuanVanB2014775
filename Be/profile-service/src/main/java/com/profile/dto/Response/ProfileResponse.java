package com.profile.dto.Response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProfileResponse {
    String profileId;
    String city;
    String address;
    String imgAvatar;
    String userName;
    String facebook;
    String phoneNumber;
}
