// Invoice.java
package com.property.entity;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

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
@ToString
@Table(name = "invoice", indexes = {
        @Index(name = "idx_room_id_invoice", columnList = "room_id"),
        @Index(name = "idx_contract_id_invoice", columnList = "contract_id"),
        @Index(name = "idx_is_paid_invoice", columnList = "isPaid")
})
public class Invoice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String invoiceId;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "invoice_id")
    Set<MonthlyUsage> monthlyUsages = new HashSet<>();

    int month;
    int year;

    BigDecimal totalUsage;

    @ManyToOne
    @JoinColumn(name = "contract_id")
    Contract contract;

    Boolean pendingInvoice;

    Boolean isPaid;
}
