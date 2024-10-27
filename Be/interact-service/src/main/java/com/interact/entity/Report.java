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
@Table(name = "report")
public class Report extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String reportId;

    String itemId;

    String userId;

    String reportType;

    String message;

    Boolean isHandled;
}
