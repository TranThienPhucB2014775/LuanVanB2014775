package com.interact.repository.specification;

import static com.interact.util.StringUtils.removeDiacritics;

import org.springframework.data.jpa.domain.Specification;

import com.interact.entity.Report;

public class ReportSpecification {

    public static Specification<Report> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(cb.like(cb.lower(cb.function("unaccent", String.class, root.get("message"))), likePattern));
        };
    }

    public static Specification<Report> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }

    public static Specification<Report> withItemId(String itemId) {
        return (root, query, cb) -> {
            if (itemId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("itemId"), itemId);
        };
    }

    public static Specification<Report> withIsHandled(Boolean isHandled) {
        return (root, query, cb) -> {
            if (isHandled == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isHandled"), isHandled);
        };
    }

    public static Specification<Report> withReportType(String reportType) {
        return (root, query, cb) -> {
            if (reportType.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("reportType"), reportType);
        };
    }
}
