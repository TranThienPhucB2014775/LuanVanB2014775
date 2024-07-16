package com.identity.entity;

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
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(name = "email", unique = true, columnDefinition = "VARCHAR(255) COLLATE \"default\"")
    String email;

    String username;
    String password;

    @Builder.Default
    Boolean enabled = true;

    @ManyToMany
    Set<Role> roles;

    String profileId;
}
