package com.notification.service;

import com.event.dto.CreateNotificationEvent;
import com.notification.Repository.NotificationRepository;
import com.notification.Repository.specification.NotificationSpecification;
import com.notification.dto.response.ListResponse;
import com.notification.dto.response.NotificationResponse;
import com.notification.entity.Notification;
import com.notification.exception.AppException;
import com.notification.exception.ErrorCode;
import com.notification.mapper.NotificationMapper;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class NotificationService {

    NotificationRepository notificationRepository;

    public void createNotification(CreateNotificationEvent request) {
        try {
            log.info("Creating notification: {}", request);
            notificationRepository.save(
                    Notification.builder()
                            .title(request.getTitle())
                            .message(request.getMessage())
                            .userId(request.getRecipient())
                            .build()
            );
            log.info("112");
        } catch (Exception e) {
            log.error("Error creating notification: {}", e.getMessage());
        }

    }

    public void markAsRead(String notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ErrorCode.NOTIFICATION_NOT_FOUND));
        notification.setIsRead(true);
        notificationRepository.save(notification);
    }

    public ListResponse<NotificationResponse> getNotifications(
            int pageNum,
            int pageSize,
            Boolean isRead
    ) {

        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<Notification> notifications = getNotifications(userId, isRead, pageable);

        return ListResponse.<NotificationResponse>builder()
                .data(notifications.stream().map(NotificationMapper::mapToNotificationResponse).collect(Collectors.toList()))
                .totalPage(notifications.getTotalPages())
                .totalElement(notifications.getTotalElements())
                .build();
    }

    Page<Notification> getNotifications(
            String userId,
            Boolean isRead,
            Pageable pageable
    ) {
        Specification<Notification> specification = Specification
                .where(NotificationSpecification.withUserId(userId))
                .and(NotificationSpecification.withIsRead(isRead));
        ;
        return notificationRepository.findAll(specification, pageable);
    }
}
