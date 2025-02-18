package com.post.constant;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum BookmarkType {
    @JsonProperty("RENTAL")
    RENTAL,
    @JsonProperty("SALE")
    SALE
}
