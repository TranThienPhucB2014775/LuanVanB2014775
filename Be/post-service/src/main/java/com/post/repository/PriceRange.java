package com.post.repository;

public class PriceRange {
    private Long minPrice;
    private Long maxPrice;

    public PriceRange(Long minPrice, Long maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    public Long getMinPrice() {
        return minPrice;
    }

    public Long getMaxPrice() {
        return maxPrice;
    }
}