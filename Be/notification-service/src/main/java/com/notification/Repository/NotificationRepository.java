package com.notification.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.notification.entity.Notification;

public interface NotificationRepository
        extends JpaRepository<Notification, String>, JpaSpecificationExecutor<Notification> {

    Long countAllByUserIdAndIsRead(String userId, boolean isRead);
}
