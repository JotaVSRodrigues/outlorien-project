package com.example.ourlorien.service;

import com.example.ourlorien.dto.request.RegisterUserRequest;
import com.example.ourlorien.dto.response.UserResponse;
import com.example.ourlorien.entity.User;
import com.example.ourlorien.enums.Role;
import com.example.ourlorien.enums.Status;
import com.example.ourlorien.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse register(RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            // Haverá uma excessão personaliza futuramente
            throw new RuntimeException("Email already registered.");
        }

        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        user.setRole(Role.USER);
        user.setStatus(Status.ACTIVE);
        user.setPasswordHash(request.password());
        // Futuramente
        // user.setPasswordHash(passwordEncoder.encode(request.password()));

        User savedUser = userRepository.save(user);

        return new UserResponse(
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail()
        );
    }
}
