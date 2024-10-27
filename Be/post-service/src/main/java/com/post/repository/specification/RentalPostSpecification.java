package com.post.repository.specification;

import com.post.entity.RentalPost;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.domain.Specification;

import static com.post.util.StringUtils.removeDiacritics;

public class RentalPostSpecification {

    private static final Logger log = LoggerFactory.getLogger(RentalPostSpecification.class);

    public static Specification<RentalPost> withSearch(String search) {
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
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("district"))), likePattern)
            );
        };
    }

    public static Specification<RentalPost> withAvailability(Boolean isAvailable) {

        log.info("isAvailable: " + isAvailable);

        return (root, query, cb) -> {
            if (isAvailable == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isAvailable"), isAvailable);
        };
    }

    public static Specification<RentalPost> withCity(String city) {
        return (root, query, cb) -> {
            if (city == null || city.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("city"), city);
        };
    }

    public static Specification<RentalPost> withDistrict(String district) {
        return (root, query, cb) -> {
            if (district == null || district.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("district"), district);
        };
    }

    public static Specification<RentalPost> withWard(String ward) {
        return (root, query, cb) -> {
            if (ward == null || ward.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("ward"), ward.toLowerCase());
        };
    }

    public static Specification<RentalPost> withMinPrice(Integer minPrice) {
        return (root, query, cb) -> {
            if (minPrice == null) {
                return cb.conjunction();
            }
            return cb.greaterThanOrEqualTo(root.get("price"), minPrice);
        };
    }

    public static Specification<RentalPost> withMaxPrice(Integer maxPrice) {
        return (root, query, cb) -> {
            if (maxPrice == null) {
                return cb.conjunction();
            }
            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }

    public static Specification<RentalPost> withMinArea(Integer minArea) {
        return (root, query, cb) -> {
            if (minArea == null) {
                return cb.conjunction();
            }
            return cb.greaterThanOrEqualTo(root.get("area"), minArea);
        };
    }

    public static Specification<RentalPost> withMaxArea(Integer maxArea) {
        return (root, query, cb) -> {
            if (maxArea == null) {
                return cb.conjunction();
            }
            return cb.lessThanOrEqualTo(root.get("area"), maxArea);
        };
    }

    public static Specification<RentalPost> withTenantType(String tenantType) {
        return (root, query, cb) -> {
            if (tenantType == null || tenantType.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("tenantType"), tenantType);
        };
    }

    public static Specification<RentalPost> withAmenities(String amenities) {
        return (root, query, cb) -> {
            if (amenities == null || amenities.isEmpty()) {
                return cb.conjunction();
            }
            return cb.like(root.get("amenities"), "%" + amenities + "%");
        };
    }

    public static Specification<RentalPost> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }
}
