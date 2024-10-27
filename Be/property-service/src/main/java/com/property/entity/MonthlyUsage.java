// MonthlyUsage.java
package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "monthly_usage")
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

    @ManyToOne
    @JoinTable(
            name = "monthly_usage_additional_cost",
            joinColumns = @JoinColumn(name = "monthly_usage_id"),
            inverseJoinColumns = @JoinColumn(name = "additional_cost_id"))
    @Lazy
    AdditionalCost additionalCost;

    @ManyToOne
    @JoinColumn(name = "invoice_id")
    Invoice invoice;
}