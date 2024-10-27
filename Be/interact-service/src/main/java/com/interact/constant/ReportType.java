package com.interact.constant;

import jakarta.persistence.JoinColumn;

import lombok.Getter;

@Getter
public enum ReportType {
    @JoinColumn(name = "user")
    USER,

    @JoinColumn(name = "rental_post")
    RENTAL_POST,

    @JoinColumn(name = "apartment")
    APARTMENT,
}
