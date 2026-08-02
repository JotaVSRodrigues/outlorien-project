package com.example.ourlorien.repository;

import com.example.ourlorien.entity.User;
import org.hibernate.internal.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
//    List<User> findByNameContainingIgnoreCase(String name);
    boolean existsByEmail(String email);
}