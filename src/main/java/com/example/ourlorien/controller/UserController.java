package com.example.ourlorien.controller;

import com.example.ourlorien.dto.request.RegisterUserRequest;
import com.example.ourlorien.dto.response.UserResponse;
import com.example.ourlorien.entity.User;
import com.example.ourlorien.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

//    public UserResponse register(@Valid @RequestBody RegisterUserRequest request) {
//        return userService.register(request);
//    }

}
