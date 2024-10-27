package com.interact.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.interact.entity.FeedBack;

public interface FeedBackRepository extends JpaRepository<FeedBack, String>, JpaSpecificationExecutor<FeedBack> {
    Page<FeedBack> findAllByItemId(String itemId, Pageable pageable);

    Optional<FeedBack> findByUserIdAndItemId(String userId, String itemId);

    @Query("select sum(f.rating) from FeedBack f where f.itemId = :itemId")
    Long sumByItemId(@Param("itemId") String itemId);

    @Query("select sum(f.rating) from FeedBack f where f.userId = :userId")
    Long sumByUserId(String userId);
}
