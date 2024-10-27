package com.identity.repository.specification;

import com.identity.entity.UserVerificationRequest;
import org.springframework.data.jpa.domain.Specification;

import static com.identity.util.StringUtils.removeDiacritics;


public class UserVerificationRequestSpecification {

    public static Specification<UserVerificationRequest> withSearch(String search) {
        String finalSearch = removeDiacritics(search);
        return (root, query, cb) -> {
            if (finalSearch == null || finalSearch.isEmpty()) {
                return cb.conjunction();
            }
            String likePattern = "%" + finalSearch.toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(cb.function("unaccent", String.class, root.get("message"))), likePattern));
        };
    }

    public static Specification<UserVerificationRequest> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }

    public static Specification<UserVerificationRequest> withCardId(String cardId) {
        return (root, query, cb) -> {
            if (cardId == null || cardId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("cardId"), cardId);
        };
    }

    public static Specification<UserVerificationRequest> withIsChecked(Boolean isChecked) {
        return (root, query, cb) -> {
            if (isChecked == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isChecked"), isChecked);
        };
    }

    public static Specification<UserVerificationRequest> withIsSuccessful(Boolean isSuccessful) {
        return (root, query, cb) -> {
            if (isSuccessful == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isSuccessful"), isSuccessful);
        };
    }

}
