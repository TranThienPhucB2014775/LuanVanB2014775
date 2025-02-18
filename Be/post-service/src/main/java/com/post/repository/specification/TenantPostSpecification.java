package com.post.repository.specification;

import static com.post.util.StringUtils.removeDiacritics;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import com.post.entity.TenantPost;

public class TenantPostSpecification {

    private static final Logger log = LoggerFactory.getLogger(TenantPostSpecification.class);

    public static Specification<TenantPost> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("title"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("description"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("city"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("address"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("ward"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("district"))), likePattern));
        };
    }

    public static Specification<TenantPost> withAvailability(Boolean isAvailable) {

        log.info("isAvailable: " + isAvailable);

        return (root, query, cb) -> {
            if (isAvailable == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isAvailable"), isAvailable);
        };
    }

    public static Specification<TenantPost> withCity(String city) {
        return (root, query, cb) -> {
            if (city == null || city.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("city"), city);
        };
    }

    public static Specification<TenantPost> withDistrict(String district) {
        return (root, query, cb) -> {
            if (district == null || district.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("district"), district);
        };
    }

    public static Specification<TenantPost> withWard(String ward) {
        return (root, query, cb) -> {
            if (ward == null || ward.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("ward"), ward.toLowerCase());
        };
    }

    public static Specification<TenantPost> withMinPrice(Integer minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) {
                return cb.conjunction();
            }
            return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
        };
    }

    public static Specification<TenantPost> withMaxPrice(Integer maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) {
                return cb.conjunction();
            }
            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }

    public static Specification<TenantPost> withTenantPostType(String tenantPostType) {
        return (root, query, cb) -> {
            if (tenantPostType == null || tenantPostType.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("tenantPostType"), tenantPostType);
        };
    }

    public static Specification<TenantPost> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }
}
