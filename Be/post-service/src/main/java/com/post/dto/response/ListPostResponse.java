package com.post.dto.response;

import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListPostResponse<T> {
    List<T> data;
    int totalPage;
    Long totalElement;
    Long minPrice;
    Long maxPrice;
}
