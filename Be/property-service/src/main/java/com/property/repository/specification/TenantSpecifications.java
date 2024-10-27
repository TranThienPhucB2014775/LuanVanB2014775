package com.property.repository.specification;

import com.property.entity.Apartment;
import com.property.entity.Tenant;
import org.springframework.data.jpa.domain.Specification;

import static com.property.util.StringUtils.removeDiacritics;

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
