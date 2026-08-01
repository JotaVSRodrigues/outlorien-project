package com.example.ourlorien.controller;

import com.example.ourlorien.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
    * @PostMapping
    * public User register(...) {}
    * */
}
