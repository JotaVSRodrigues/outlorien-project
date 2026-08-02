package com.example.ourlorien.service;

import com.example.ourlorien.dto.request.RegisterUserRequest;
import com.example.ourlorien.dto.response.UserResponse;
import com.example.ourlorien.entity.User;
import com.example.ourlorien.enums.Role;
import com.example.ourlorien.enums.Status;
import com.example.ourlorien.exception.EmailAlreadyExistsException;
import com.example.ourlorien.exception.ResourceNotFoundException;
import com.example.ourlorien.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse register(RegisterUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            // Haverá uma excessão personaliza futuramente
            throw new EmailAlreadyExistsException("Email already registered.");
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

    public UserResponse findById(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }
//    public static void main(String[] args) {
//        SpringApplication.run(OurlorienApplication.class, args);
//    }
//
//}
//    public List<UserResponse> listOfUsersByName(String name) {
//        List<User> usersList = userRepository.findByNameContainingIgnoreCase(name);
//
//        if (usersList.isEmpty()) {
//            throw new ResourceNotFoundException("Users containing '" + name + "' not found.");
//        }
//
//        return new List<UserResponse>() {
//            user.getId(),
//            user.getName(),
//            user.getEmail()
//        }
//    }
}
