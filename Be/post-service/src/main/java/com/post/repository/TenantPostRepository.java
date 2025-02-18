package com.post.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.post.entity.TenantPost;

public interface TenantPostRepository extends JpaRepository<TenantPost, String>, JpaSpecificationExecutor<TenantPost> {

    @Query("SELECT MIN(r.price) FROM TenantPost r")
    Long getMinPrice();

    @Query("SELECT MAX(r.price) FROM TenantPost r")
    Long getMaxPrice();

    @Query("SELECT new com.post.repository.PriceRange(MIN(r.price), MAX(r.price)) FROM TenantPost r")
    PriceRange getPriceRange();

    @Query(
            value = "SELECT TO_CHAR(r.created_at, 'YYYY-MM') as month, COUNT(r) " + "FROM tenant_post r "
                    + "WHERE r.created_at >= NOW() - INTERVAL '12 months' "
                    + "GROUP BY TO_CHAR(r.created_at, 'YYYY-MM')",
            nativeQuery = true)
    List<Object[]> countTenantPostsLast12Months();
}
