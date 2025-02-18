package com.property.repository.specification;

import org.springframework.data.jpa.domain.Specification;

import com.property.entity.Tenant;

public class TenantSpecifications {

    public static Specification<Tenant> withAvailability(Boolean isAvailable) {
        return (root, query, cb) -> {
            if (isAvailable == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isAvailable"), isAvailable);
        };
    }

    public static Specification<Tenant> withLandlordId(String landlordId) {
        return (root, query, cb) -> {
            if (landlordId == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("contract").get("landlordId"), landlordId);
        };
    }
}
