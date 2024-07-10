package com.identity.dto.Response;

import java.time.LocalDate;

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
    String urlImgAvatar;
}
