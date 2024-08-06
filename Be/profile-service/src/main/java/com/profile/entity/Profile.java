package com.profile.entity;

import jakarta.persistence.*;

import jakarta.validation.constraints.Pattern;
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
@Table(indexes = {
        @Index(name = "profileId", columnList = "profileId", unique = true),
        @Index(name = "userId", columnList = "userId", unique = true)
})
public class Profile extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "profile_id", unique = true)
    String id;
    String userId;

    String userName;
    String city;
    String address;
    String ImgAvatar;
    String facebook;
    String phoneNumber;

}
