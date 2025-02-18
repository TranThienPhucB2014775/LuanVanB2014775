package com.property.entity;

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
@Table(name = "report_issue", indexes = {
        @Index(name = "idx_tenant_id_report_issue", columnList = "tenantId"),
        @Index(name = "idx_landlord_id_report_issue", columnList = "landlordId"),
        @Index(name = "idx_room_id_report_issue", columnList = "room_id"),
        @Index(name = "idx_status_report_issue", columnList = "status")
})
public class ReportIssue extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String reportIssueId;

    String tenantId;

    String landlordId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @Column(columnDefinition = "TEXT")
    String description;

    String title;

    String status;
}
