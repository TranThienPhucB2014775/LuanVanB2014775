package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "report_issue")
public class ReportIssue extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String reportIssueId;

    String tenantId;

    String landlordId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    String description;

    String title;

    String status;
}
