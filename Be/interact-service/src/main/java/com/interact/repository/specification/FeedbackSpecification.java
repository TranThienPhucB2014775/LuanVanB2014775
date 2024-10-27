package com.interact.repository.specification;

import static com.interact.util.StringUtils.removeDiacritics;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import com.interact.entity.FeedBack;

public class FeedbackSpecification {

    private static final Logger log = LoggerFactory.getLogger(FeedbackSpecification.class);

    public static Specification<FeedBack> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                log.info("Search: {}", finalSearch);
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(cb.like(cb.lower(cb.function("unaccent", String.class, root.get("feedBack"))), likePattern));
        };
    }

    public static Specification<FeedBack> withAvailability(Boolean isAvailable) {
        return (root, query, cb) -> {
            if (isAvailable == null) {
                log.info("Is available: {}", isAvailable);
                return cb.conjunction();
            }
            return cb.equal(root.get("isAvailable"), isAvailable);
        };
    }

    public static Specification<FeedBack> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId.isEmpty()) {
                log.info("User id: {}", userId);
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }

    public static Specification<FeedBack> withItemId(String itemId) {
        return (root, query, cb) -> {
            if (itemId.isEmpty()) {
                log.info("Item id: {}", itemId);
                return cb.conjunction();
            }
            return cb.equal(root.get("itemId"), itemId);
        };
    }
}
