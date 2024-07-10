package com.identity.mapper;

import java.util.Set;
import java.util.stream.Collectors;

import com.identity.dto.Response.RoleResponse;
import com.identity.entity.Role;

public class RoleMapper {
    public static Set<RoleResponse> map(Set<Role> roles) {

        Set<RoleResponse> RoleResponse = roles.stream()
                .map(role -> new RoleResponse(
                        role.getDescription(),
                        role.getName(),
                        PermissionMapper.permissionToPermissionResponse(role.getPermissions())))
                .collect(Collectors.toSet());

        return RoleResponse;
    }
}
