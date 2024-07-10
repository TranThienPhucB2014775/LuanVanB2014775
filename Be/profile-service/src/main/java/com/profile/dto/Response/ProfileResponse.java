package com.profile.dto.Response;

import java.time.LocalDate;

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
    String urlImgAvatar;
}
