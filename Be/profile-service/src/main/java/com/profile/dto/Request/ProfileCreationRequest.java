package com.profile.dto.Request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProfileCreationRequest {
    String city;
    String address;
}
