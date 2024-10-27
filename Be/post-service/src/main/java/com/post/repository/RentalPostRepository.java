package com.post.repository;

import com.post.entity.RentalPost;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalPostRepository extends JpaRepository<RentalPost, String>, JpaSpecificationExecutor<RentalPost> {

    @Query("SELECT MIN(r.price) FROM RentalPost r")
    Long getMinPrice();

    @Query("SELECT MAX(r.price) FROM RentalPost r")
    Long getMaxPrice();


    @Query("SELECT new com.post.repository.PriceRange(MIN(r.price), MAX(r.price)) FROM RentalPost r")
    PriceRange getPriceRange();

}
