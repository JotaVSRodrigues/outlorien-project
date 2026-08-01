package com.example.ourlorien.service;

import com.example.ourlorien.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping
    public void register(String email) {
        if (userRepository.existsByEmail(email)) {
//            userRepository.save();
        }

//        userRepository.save();
    }
}
