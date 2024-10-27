// Invitation.java
package com.property.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "invitation")
@ToString
public class Invitation extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @ManyToOne
    @JoinTable(
            name = "invitation_room",
            joinColumns = @JoinColumn(name = "invitation_id"),
            inverseJoinColumns = @JoinColumn(name = "room_id"))
    Room room;

    String landlordId;
    String tenantId;

    String invitationStatus;

    @Column(name = "invite_token", length = 500)
    String inviteToken;

    String message;

    BigDecimal price;
    BigDecimal depositAmount;
}