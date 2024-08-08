package com.identity.service;

import java.util.*;
import java.util.stream.Collectors;

import com.event.dto.NotificationEvent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.identity.config.CustomJwtDecoder;
import com.identity.dto.Request.ProfileCreationRequest;
import com.identity.dto.Request.UserCreateRequest;
import com.identity.dto.Response.AllUserResponse;
import com.identity.dto.Response.ListResponse;
import com.identity.dto.Response.UserResponse;
import com.identity.entity.Role;
import com.identity.entity.User;
import com.identity.exception.AppException;
import com.identity.exception.ErrorCode;
import com.identity.mapper.ProfileMapper;
import com.identity.mapper.UserMapper;
import com.identity.repository.RoleRepository;
import com.identity.repository.UserRepository;
import com.identity.service.client.ProfileClientService;

import feign.FeignException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    CustomJwtDecoder customJwtDecoder;
    ProfileClientService profileClientService;

    KafkaTemplate<String, Object> kafkaTemplate;


    public UserResponse createUser(UserCreateRequest request) {
        User user = UserMapper.userCreateRequestToUser(request);

        HashSet<Role> roles = new HashSet<>();
        log.info("Create user with role: {}", request.getRole());
        roleRepository.findById(request.getRole().toString()).ifPresent(roles::add);

        String userId = UUID.randomUUID().toString();
        log.info("Create user with id: {}", userId);
        user.setId(userId);

        user.setRoles(roles);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        ProfileCreationRequest profileCreationRequest =
                ProfileMapper.userCreateRequestToProfileCreationRequest(request);

        profileCreationRequest.setUserId(userId);
        log.info("Create profile with user id: {}", profileCreationRequest);
        log.info("Create profile with user id: {}", request.getUserName());
        try {
            var profileCreation = profileClientService.createProfile(profileCreationRequest);

            user.setProfileId(profileCreation.getResult().getProfileId());
            user = userRepository.save(user);

            UserResponse userResponse = UserMapper.userToUserResponse(user);

            ProfileMapper.profileCreationResponseOnUserResponse(userResponse, profileCreation.getResult());

            NotificationEvent notificationEvent = NotificationEvent.builder()
                    .channel("EMAIL")
                    .recipient(user.getEmail())
                    .subject("Welcome to US")
                    .body("Hello, " + profileCreation.getResult().getUserName())
                    .build();

            // Publish message to kafka
            kafkaTemplate.send("notification-delivery", notificationEvent);

            return userResponse;
        } catch (FeignException e) {
            log.info("Error: {}", e.getMessage());
            throw new AppException(ErrorCode.PROFILE_SERVICE_ERROR);
        }
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ListResponse<AllUserResponse> getAllUser(
            int pageNum, int pageSize, String sortBy, String order, String search, Boolean isEnable) {
        Sort sort = Sort.by(order.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, sortBy);
        Pageable pageable = PageRequest.of(pageNum, pageSize, sort);

        Page<User> users = userRepository.findByEmailContainingAndEnabled(search, isEnable, pageable);

        return ListResponse.<AllUserResponse>builder()
                .data(users.stream().map(UserMapper::userToAllUserResponse).collect(Collectors.toList()))
                .totalPage(users.getTotalPages())
                .totalElement(users.getTotalElements())
                .build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void deleteUser(String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        if (user.get().getRoles().equals("ROLE_ADMIN")) {
            throw new AppException(ErrorCode.CANNOT_DELETE_ADMIN);
        }
        user.get().setEnabled(false);
        userRepository.save(user.get());
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void enableUser(String userEmail) {
        Optional<User> user = userRepository.findByEmail(userEmail);
        user.get().setEnabled(true);
        userRepository.save(user.get());
    }

    public UserResponse getUser(String token) {
        var jwt = customJwtDecoder.decode(token);

        var user = userRepository
                .findById(jwt.getSubject())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        try {
            var profileResponse = profileClientService.getProfile("Bearer " + token);
            UserResponse userResponse = UserMapper.userToUserResponse(user);

            ProfileMapper.profileResponseOnUserResponse(userResponse, profileResponse.getResult());
            userResponse.setRole(user.getRoles().stream().findFirst().get().getName());

            return userResponse;

        } catch (FeignException.Unauthorized e) {
            throw new AppException(ErrorCode.PROFILE_SERVICE_ERROR);
        }
    }

    //    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public UserResponse getUserByEmail(String userId, String token) {

        var user = userRepository.findById(userId).orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        try {
            var profileResponse = profileClientService.getProfileByUserId(userId, "Bearer " + token);
            UserResponse userResponse = UserMapper.userToUserResponse(user);

            ProfileMapper.profileResponseOnUserResponse(userResponse, profileResponse.getResult());
            userResponse.setRole(user.getRoles().stream().findFirst().get().getName());
            return userResponse;

        } catch (FeignException.Unauthorized e) {
            throw new AppException(ErrorCode.PROFILE_SERVICE_ERROR);
        }
    }

    public boolean isAdminScope(String token) {
        var jwt = customJwtDecoder.decode(token);
        var scopeClaim = jwt.getClaims().get("scope");
        List<String> scopes;
        if (scopeClaim instanceof String) {
            scopes = Arrays.asList(((String) scopeClaim).split(" "));
        } else if (scopeClaim instanceof List) {
            scopes = (List<String>) scopeClaim;
        } else {
            throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
        }
        return scopes.contains("ROLE_ADMIN");
    }
}
