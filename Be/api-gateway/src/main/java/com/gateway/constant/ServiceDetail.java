package com.gateway.constant;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDetail {
    private String path;
    private String serviceName;
}
