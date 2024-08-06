package com.identity.dto.Response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProfileResponse {
    String profileId;
    String city;
    String address;
    String imgAvatar;
    String userName;
    String facebook;
    String phoneNumber;
}
