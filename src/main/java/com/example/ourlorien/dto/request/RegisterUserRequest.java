package com.example.ourlorien.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterUserRequest(
        @NotBlank
        @Size(max = 120)
        String name,

        @Email
        String email,

        @Size(min = 8, max = 100)
        String password
) {
}
