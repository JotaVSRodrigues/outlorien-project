package com.example.ourlorien.service;

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

    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            // Irei lançar uma exceção personalizada futuramente
            throw new RuntimeException("Email already registered.");
        }

        // Futuramente
        // user.setPasswordHash(passwordEncoder.encode(user.getPassword()));

        user.setRole(Role.USER);
        user.setStatus(Status.ACTIVE);

        return userRepository.save(user);
    }
}
