package com.notification.Repository.specification;

import com.notification.entity.Notification;
import org.springframework.data.jpa.domain.Specification;

public class NotificationSpecification {


    public static Specification<Notification> withIsRead(Boolean isRead) {
        return (root, query, cb) -> {
            if (isRead == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("isRead"), isRead);
        };
    }

    public static Specification<Notification> withUserId(String userId) {
        return (root, query, cb) -> {
            if (userId == null || userId.isEmpty()) {
                return cb.conjunction();
            }
            return cb.equal(root.get("userId"), userId);
        };
    }

}
