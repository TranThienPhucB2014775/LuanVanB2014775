package com.property.repository.specification;

import static com.property.util.StringUtils.removeDiacritics;

import org.springframework.data.jpa.domain.Specification;

import com.property.entity.RoomType;

public class RoomTypeSpecifications {

    public static Specification<RoomType> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("name"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("description"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("utility"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("info"))), likePattern));
        };
    }

    public static Specification<RoomType> withAvailability(Boolean isAvailable) {
        return (root, query, cb) -> {
            if (isAvailable == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isAvailable"), isAvailable);
        };
    }

    public static Specification<RoomType> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("apartment").get("userId"), userId);
        };
    }

    public static Specification<RoomType> withApartmentId(String apartmentId) {
        return (root, query, cb) -> {
            if (apartmentId == null || apartmentId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("apartment").get("apartmentId"), apartmentId);
        };
    }

    public static Specification<RoomType> withRoomTypeName(String roomTypeName) {
        return (root, query, cb) -> {
            if (roomTypeName == null || roomTypeName.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("name"), roomTypeName);
        };
    }
}
