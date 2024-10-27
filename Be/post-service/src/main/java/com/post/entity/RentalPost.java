package com.post.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Slf4j
@Table(name = "rental_posts")
public class RentalPost extends BaseEntity {

    /**
     * ID của bài đăng cho thuê, được tạo tự động.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String rentalPostId;

    /**
     * ID của người dùng (người đăng bài) liên kết với bài đăng này.
     */
    String userId;

    /**
     * Tên tỉnh/thành phố nơi chỗ ở tọa lạc.
     */
    String city;

    /**
     * Tên quận/huyện nơi chỗ ở tọa lạc.
     */
    String district;

    /**
     * Địa chỉ cụ thể của chỗ ở (bao gồm đường, phường, v.v.).
     */
    String address;

    /**
     * Tên phường/xã nơi chỗ ở tọa lạc.
     */
    String ward;

    /**
     * Tiêu đề của bài đăng cho thuê.
     */
    String title;

    /**
     * Mô tả chi tiết về chỗ ở cho thuê.
     */
    String description;

    /**
     * Các tiện nghi có sẵn trong chỗ ở (ví dụ: điều hòa, wifi, bếp, v.v.).
     */
    String amenities;

    /**
     * Diện tích của chỗ ở (tính bằng mét vuông).
     */
    Integer area;

    /**
     * Loại đối tượng thuê mà bài đăng này hướng đến (sinh viên, người đi làm, tất cả, v.v.).
     */
    String tenantType;

    /**
     * Giá thuê của chỗ ở (có thể là chuỗi để hỗ trợ định dạng tiền tệ).
     */
    long price;

    /**
     * Trạng thái có sẵn của chỗ ở (có thể là "có sẵn" hoặc "không có sẵn").
     */

    String rentalType;

    Boolean isAvailable;
}
