package com.interact.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FeedBackResponses extends ListResponse<FeedBackResponse> {
    private double averageRating;
}
