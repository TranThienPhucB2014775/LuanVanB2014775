package com.property.repository.specification;

import static com.property.util.StringUtils.removeDiacritics;

import org.springframework.data.jpa.domain.Specification;

import com.property.entity.Apartment;

public class ApartmentSpecifications {

    public static Specification<Apartment> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("name"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("description"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("city"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("address"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("rule"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("utility"))), likePattern));
        };
    }

    public static Specification<Apartment> withAvailability(Boolean isAvailable) {
        return (root, query, cb) -> {
            if (isAvailable == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isAvailable"), isAvailable);
        };
    }

    public static Specification<Apartment> withCity(String city) {
        String finalCity = removeDiacritics(city);
        return (root, query, cb) -> {
            if (finalCity == null || finalCity.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(cb.lower(cb.function("unaccent", String.class, root.get("city"))), finalCity.toLowerCase());
        };
    }

    public static Specification<Apartment> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }

    public static Specification<Apartment> withApartmentType(String apartmentType) {
        return (root, query, cb) -> {
            if (apartmentType == null || apartmentType.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("apartmentType").get("name"), apartmentType);
        };
    }
}
