// Tenant.java
package com.property.entity;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.time.Instant;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "tenant")
@ToString
public class Tenant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    String tenantId;

    @Column(name = "landlord_id") // Ensure this column is correctly defined
    String landlordId;

    Boolean isAvailable;

    Instant endDate;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "contract_tenant", joinColumns = @JoinColumn(name = "contract_id"), inverseJoinColumns = @JoinColumn(name = "tenant_id"))
    Contract contract;

    @OneToMany
    @JoinTable(name = "tenant_invoice", joinColumns = @JoinColumn(name = "tenant_id"), inverseJoinColumns = @JoinColumn(name = "invoice_id"))
    Set<Invoice> invoices;
}