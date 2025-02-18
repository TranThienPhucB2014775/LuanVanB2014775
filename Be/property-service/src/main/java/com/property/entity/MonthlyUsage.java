// MonthlyUsage.java
package com.property.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

import org.springframework.context.annotation.Lazy;

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
@Table(name = "monthly_usage", indexes = {
        @Index(name = "idx_room_id_monthly_usage", columnList = "room_id"),
        @Index(name = "idx_invoice_id_monthly_usage", columnList = "invoice_id")
})
public class MonthlyUsage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String MonthlyUsageId;

    @Column(name = "room_id")
    String roomId;

    int month;
    int year;

    BigDecimal usage;

    BigDecimal cost;

    BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "additional_cost_id")
    AdditionalCost additionalCost;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    Invoice invoice;
}
