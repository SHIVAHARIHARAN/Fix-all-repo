package com.fixall.fixall.controllers;

import com.fixall.fixall.model.User;
import com.fixall.fixall.model.Admin;
import com.fixall.fixall.repository.UserRepository;
import com.fixall.fixall.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // allow frontend access
public class AuthController {

    @Autowired private UserRepository userRepo;
    @Autowired private AdminRepository adminRepo;

    // Signup (User)
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) != null) {
            return "Username already exists!";
        }
        userRepo.save(user);
        return "Signup successful!";
    }

    // Login (User)
    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User existing = userRepo.findByUsername(user.getUsername());
        if (existing != null && existing.getPassword().equals(user.getPassword())) {
            return "Login successful!";
        }
        return "Invalid credentials!";
    }

    @PostMapping("/admin/signup")
    public String adminSignup(@RequestBody Admin admin) {
        if (adminRepo.findByUsername(admin.getUsername()) != null) {
            return "Admin username already exists!";
        }
        adminRepo.save(admin);
        return "Admin signup successful!";
    }
    // Admin Login
    @PostMapping("/admin/login")
    public String adminLogin(@RequestBody Admin admin) {
        Admin existing = adminRepo.findByUsername(admin.getUsername());
        if (existing != null && existing.getPassword().equals(admin.getPassword())) {
            return "Admin login successful!";
        }
        return "Invalid admin credentials!";
    }
}
