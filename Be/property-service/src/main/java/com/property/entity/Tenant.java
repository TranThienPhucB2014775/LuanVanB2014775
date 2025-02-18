// Tenant.java
package com.property.entity;

import java.time.Instant;
import java.util.Set;

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
@Table(name = "tenant", indexes = {
        @Index(name = "idx_tenant_id_tenant", columnList = "tenantId"),
        @Index(name = "idx_landlord_id_tenant", columnList = "landlordId"),
        @Index(name = "idx_is_available_tenant", columnList = "isAvailable")
})
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

//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinTable(
//            name = "contract_tenant",
//            joinColumns = @JoinColumn(name = "contract_id"),
//            inverseJoinColumns = @JoinColumn(name = "tenant_id"))
//    Contract contract;
//    String contractId;
    @ManyToOne
    @JoinColumn(name = "contract_id")
    Contract contract;

//    @OneToMany
//    Set<Invoice> invoices;
}
