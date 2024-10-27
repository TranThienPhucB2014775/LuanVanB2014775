// Invoice.java
package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@ToString
@Table(name = "invoice")
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String invoiceId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinTable(
            name = "invoice_monthly_usage",
            joinColumns = @JoinColumn(name = "invoice_id"),
            inverseJoinColumns = @JoinColumn(name = "monthly_usage_id"))
    @Lazy
    Set<MonthlyUsage> monthlyUsages = new HashSet<>();

    int month;
    int year;

    int totalUsage;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    Contract contract;

    Boolean pendingInvoice;
}