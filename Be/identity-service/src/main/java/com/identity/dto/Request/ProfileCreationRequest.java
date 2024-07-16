package com.identity.dto.Request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class ProfileCreationRequest {
    String city;
    String address;
}
