package com.interact.entity;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "report", indexes = {
        @Index(name = "idx_is_handled_report", columnList = "isHandled"),
        @Index(name = "idx_report_type_report", columnList = "reportType"),
        @Index(name = "idx_user_id_report", columnList = "userId") // New index
})
public class Report extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String reportId;

    String itemId;

    String userId;

    String reportType;
    @Column(columnDefinition = "TEXT")
    String message;

    Boolean isHandled;
}
