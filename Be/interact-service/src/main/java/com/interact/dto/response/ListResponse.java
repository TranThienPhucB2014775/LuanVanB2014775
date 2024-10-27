package com.interact.dto.response;

import java.util.List;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder(toBuilder = true)
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ListResponse<T> {
    List<T> data;
    int totalPage;
    Long totalElement;

    public ListResponse(List<T> data, Long totalElement, int totalPage) {
        this.data = data;
        this.totalElement = totalElement;
        this.totalPage = totalPage;
    }
}
