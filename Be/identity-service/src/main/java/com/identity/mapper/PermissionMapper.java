package com.identity.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.identity.dto.Response.PermissionResponse;
import com.identity.entity.Permission;

public class PermissionMapper {
    public static Set<PermissionResponse> permissionToPermissionResponse(Set<Permission> permissions) {
        Set<PermissionResponse> permissionResponse = permissions.stream()
                .map(permission -> new PermissionResponse(permission.getName(), permission.getDescription()))
                .collect(Collectors.toSet());

        return permissionResponse;
    }
}
