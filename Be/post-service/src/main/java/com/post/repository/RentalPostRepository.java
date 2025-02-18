package com.post.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.post.entity.RentalPost;

@Repository
public interface RentalPostRepository extends JpaRepository<RentalPost, String>, JpaSpecificationExecutor<RentalPost> {

    @Query("SELECT MIN(r.price) FROM RentalPost r")
    Long getMinPrice();

    @Query("SELECT MAX(r.price) FROM RentalPost r")
    Long getMaxPrice();

    @Query("SELECT new com.post.repository.PriceRange(MIN(r.price), MAX(r.price)) FROM RentalPost r")
    PriceRange getPriceRange();

    @Query(
            value = "SELECT TO_CHAR(r.created_at, 'YYYY-MM') as month, COUNT(r) " + "FROM rental_post r "
                    + "WHERE r.created_at >= NOW() - INTERVAL '12 months' "
                    + "GROUP BY TO_CHAR(r.created_at, 'YYYY-MM')",
            nativeQuery = true)
    List<Object[]> countRentalPostsLast12Months();
}
