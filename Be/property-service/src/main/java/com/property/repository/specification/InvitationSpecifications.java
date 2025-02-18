package com.property.repository.specification;

import static com.property.util.StringUtils.removeDiacritics;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import com.property.entity.Invitation;

@Component
public class InvitationSpecifications {

    public static Specification<Invitation> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(cb.like(cb.lower(cb.function("unaccent", String.class, root.get("message"))), likePattern));
        };
    }

    public static Specification<Invitation> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }

    public static Specification<Invitation> withInvitationStatus(String invitationStatus) {
        return (root, query, cb) -> {
            if (invitationStatus == null || invitationStatus.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("invitationStatus"), invitationStatus);
        };
    }

    public static Specification<Invitation> withRoomId(String roomId) {
        return (root, query, cb) -> {
            if (roomId == null || roomId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("room").get("roomId"), roomId);
        };
    }

    public static Specification<Invitation> withRoomTypeId(String roomTypeId) {
        return (root, query, cb) -> {
            if (roomTypeId == null || roomTypeId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("room").get("roomType").get("roomTypeId"), roomTypeId);
        };
    }

    public static Specification<Invitation> withApartmentId(String apartmentId) {
        return (root, query, cb) -> {
            if (apartmentId == null || apartmentId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("room").get("roomType").get("apartment").get("apartmentId"), apartmentId);
        };
    }
}
