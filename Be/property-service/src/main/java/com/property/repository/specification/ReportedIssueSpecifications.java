package com.property.repository.specification;

import static com.property.util.StringUtils.removeDiacritics;

import jakarta.persistence.criteria.Join;

import org.springframework.data.jpa.domain.Specification;

import com.property.entity.ReportIssue;

public class ReportedIssueSpecifications {

    public static Specification<ReportIssue> withTenantId(String tenantId) {
        return (root, query, cb) -> {
            if (tenantId == null || tenantId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("createdBy"), tenantId);
        };
    }

    public static Specification<ReportIssue> withRoomId(String roomId) {
        return (root, query, cb) -> {
            if (roomId == null || roomId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("room").get("roomId"), roomId);
        };
    }

    public static Specification<ReportIssue> withLandlordId(String landlordId) {
        return (root, query, cb) -> {
            if (landlordId == null || landlordId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("landlordId"), landlordId);
        };
    }

    public static Specification<ReportIssue> withStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<ReportIssue> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }

            String likePattern = "%" + finalSearch.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("title"))), likePattern),
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("description"))), likePattern));
        };
    }

    public static Specification<ReportIssue> withApartmentId(String apartmentId) {
        return (root, query, cb) -> {
            if (apartmentId == null || apartmentId.isEmpty()) {
                return cb.conjunction();
            }
            Join<Object, Object> roomJoin = root.join("room");
            return cb.equal(roomJoin.get("roomType").get("apartment").get("apartmentId"), apartmentId);
        };
    }
}
