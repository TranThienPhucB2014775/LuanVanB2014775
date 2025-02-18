// Invitation.java
package com.property.entity;

import java.math.BigDecimal;

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
@Table(name = "invitation", indexes = {
        @Index(name = "idx_landlord_id_invitation", columnList = "landlordId"),
        @Index(name = "idx_tenant_id_invitation", columnList = "tenantId"),
        @Index(name = "idx_invitation_status_invitation", columnList = "invitationStatus")
})
@ToString
public class Invitation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "invitation_id")
    String id;

    @ManyToOne
    @JoinColumn(name = "room_id")
    Room room;

    String landlordId;
    String tenantId;

    String invitationStatus;

    @Column(name = "invite_token", length = 500)
    String inviteToken;

    @Column(columnDefinition = "TEXT")

    String message;

    BigDecimal price;
    BigDecimal depositAmount;
}
