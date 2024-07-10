package com.profile.dto.Request;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;

import com.profile.validator.DobConstraint;

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
