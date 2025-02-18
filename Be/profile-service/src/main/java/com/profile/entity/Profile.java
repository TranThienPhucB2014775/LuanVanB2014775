package com.profile.entity;

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
@ToString
@Table(name = "profile", indexes = {
        @Index(name = "idx_user_id_profile", columnList = "userId")
})
public class Profile extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "profile_id", unique = true)
    String id;

    String userId;
    @Column(columnDefinition = "TEXT")
    String aboutMe;

    String userName;
    String city;
    String address;
    String ImgAvatar;
    String facebook;
    String phoneNumber;
    String zaloPhoneNumber;
}
