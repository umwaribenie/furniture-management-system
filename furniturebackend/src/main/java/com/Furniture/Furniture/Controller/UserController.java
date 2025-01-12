    package com.Furniture.Furniture.Controller;

    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.data.domain.Pageable;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;

    import org.springframework.web.bind.annotation.*;

import com.Furniture.Furniture.Dto.UserDto;
import com.Furniture.Furniture.Service.UserService;
import com.Furniture.Furniture.model.User;

import jakarta.persistence.EntityNotFoundException;
    import lombok.RequiredArgsConstructor;

    import java.util.Random;

    @RestController
    @RequestMapping("/api/user")
    @RequiredArgsConstructor
    @CrossOrigin("*")
    public class UserController {

        private final UserService userService;



        @PostMapping
        public ResponseEntity<?> postUser(@RequestBody UserDto dto) {
            User createdUser = userService.postUser(dto);
            if (createdUser != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }

        @PostMapping("/signup")
        public ResponseEntity<?> signupUser(@RequestBody UserDto userDto) {
            try {
                User createdUser = userService.signupUser(userDto);
                return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
            } catch (IllegalArgumentException ex) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
            }
        }

        @PostMapping("/send-otp")
        public ResponseEntity<?> sendOtpForPasswordReset(@RequestParam String otpEmail) {
            String otp = generateOtp();
            userService.sendOtpForPasswordReset(otpEmail, otp);
            return ResponseEntity.ok("OTP sent to " + otpEmail);
        }

        private String generateOtp() {
            Random random = new Random();
            int otp = 100000 + random.nextInt(900000);
            return String.valueOf(otp);
        }

        @PutMapping("/reset-password")
        public ResponseEntity<?> updatePassword(@RequestParam String email, @RequestParam String otpEmail, @RequestParam String otp, @RequestParam String newPassword) {
            try {
                userService.validateOtpAndResetPassword(email, otpEmail, otp, newPassword);
                return ResponseEntity.ok("Password has been reset successfully.");
            } catch (IllegalArgumentException ex) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
            }
        }

        @GetMapping("/all")
        public ResponseEntity<?> getAllUsers() {
            return ResponseEntity.ok(userService.getAllUsers());
        }

        @GetMapping("/{id}")
        public ResponseEntity<?> getUserById(@PathVariable Integer id) {
            try {
                return ResponseEntity.ok(userService.getUserById(id));
            } catch (EntityNotFoundException ex) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UserDto dto) {
            try {
                return ResponseEntity.ok(userService.updateUser(id, dto));
            } catch (EntityNotFoundException ex) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
            }
        }

        @GetMapping
        public ResponseEntity<Page<User>> getUsers(@RequestParam(defaultValue = "0") int page,
                                                @RequestParam(defaultValue = "5") int size) {
            Pageable pageable = PageRequest.of(page, size);
            Page<User> users = userService.getUsers(pageable);
            return ResponseEntity.ok(users);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
            try {
                userService.deleteUser(id);
                return ResponseEntity.ok(null);
            } catch (EntityNotFoundException ex) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
            }
        }


 

   
        @PostMapping("/send-otp-login")
        public ResponseEntity<?> sendOtpForLogin(@RequestParam String otpEmail) {
            String otp = generateOtp();
            userService.sendOtpForLogin(otpEmail, otp);
            return ResponseEntity.ok("OTP sent to " + otpEmail);
        }
 
    // Method to login with email,otp email, OTP, and password
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email,@RequestParam String otpEmail, @RequestParam String otp, @RequestParam String password) {
        try {
            User user = userService.validateOtpAndlogin(email, otpEmail,otp, password);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
    }
