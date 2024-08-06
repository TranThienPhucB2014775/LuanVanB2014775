package com.identity.dto.Response;

import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListResponse<T> {
    List<T> data;
    int totalPage;
    Long totalElement;
}
