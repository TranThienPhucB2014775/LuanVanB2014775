package com.post.repository;

import com.post.entity.TenantPost;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface TenantPostRepository extends JpaRepository<TenantPost, String>, JpaSpecificationExecutor<TenantPost> {

    @Query("SELECT MIN(r.price) FROM TenantPost r")
    Long getMinPrice();

    @Query("SELECT MAX(r.price) FROM TenantPost r")
    Long getMaxPrice();


    @Query("SELECT new com.post.repository.PriceRange(MIN(r.price), MAX(r.price)) FROM TenantPost r")
    PriceRange getPriceRange();

}
