package com.Furniture.Furniture.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

import com.Furniture.Furniture.Dto.UserDto;
import com.Furniture.Furniture.Repository.UserRepository;
import com.Furniture.Furniture.model.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ConcurrentHashMap<String, String> otpStorage = new ConcurrentHashMap<>();

    @Autowired
    private JavaMailSender mailSender;



    // Method to create a new user
    
    public User postUser(UserDto userDto) {
        return saveOrUpdateUser(new User(), userDto);
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

      // Password hashing method
    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }

    // Method to save or update a user
    private User saveOrUpdateUser(User user, UserDto userDto) {
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setGender(userDto.getGender());
        user.setPhone(userDto.getPhone());
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(hashPassword(userDto.getPassword()));
        user.setRole(userDto.getRole());
        return userRepository.save(user);
    }

    // Method to handle user signup
  
    public User signupUser(UserDto userDto) {
        if (findByUsername(userDto.getUsername()) != null) {
            throw new IllegalArgumentException("Username already taken");
        }
        return saveOrUpdateUser(new User(), userDto);
    }

    // Method to get all users
   
    public List<User> getAllUsers() {
        return userRepository.findAll().stream().collect(Collectors.toList());
    }

    // Method to get a user by ID

    public User getUserById(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new EntityNotFoundException("User is not present with id " + id);
        }
    }

    // Method to update a user

    public User updateUser(Integer id, UserDto userDto) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            return saveOrUpdateUser(optionalUser.get(), userDto);
        } else {
            throw new EntityNotFoundException("User is not present with id " + id);
        }
    }

    // Method to get paginated users

    public Page<User> getUsers(Pageable pageable) {
        return userRepository.findAll(pageable);
    }

    // Method to delete a user

    public void deleteUser(Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            userRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("User is not present with id " + id);
        }
    }

    // Method to send OTP for password reset to any email
  
    public void sendOtpForPasswordReset(String otpEmail, String otp) {
        otp = generateforgotpasswordOtp();  // Generate the OTP here
        otpStorage.put(otpEmail, otp);
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(otpEmail);
        mailMessage.setSubject("Password Reset OTP");
        mailMessage.setText("Your OTP for password reset is: " + otp);
        mailSender.send(mailMessage);
    }

    // Method to generate forgot password OTP
    private String generateforgotpasswordOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }


      // Method to generate login OTP
      private String generateloginOtp() {
        Random random = new Random();
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }


    // Method to validate OTP and reset password

    public void validateOtpAndResetPassword(String email, String otpEmail, String otp, String newPassword) {
        String storedOtp = otpStorage.get(otpEmail);

        if (storedOtp == null || !storedOtp.equals(otp)) {
            throw new IllegalArgumentException("Invalid or expired OTP");
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("The provided email does not exist.");
        }

        user.setPassword(hashPassword(newPassword));
        userRepository.save(user);

        otpStorage.remove(otpEmail);
    }


    

    // Method to find user by email
   
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

  // Method to send OTP for password reset to any email

  public void sendOtpForLogin(String otpEmail, String otp) {
      otp = generateloginOtp();  // Generate the OTP here
      otpStorage.put(otpEmail, otp);
      SimpleMailMessage mailMessage = new SimpleMailMessage();
      mailMessage.setTo(otpEmail);
      mailMessage.setSubject("Login OTP");
      mailMessage.setText("Your OTP for login is: " + otp);
      mailSender.send(mailMessage);
  }


        // Method to validate OTP for login

        public boolean validateOtpForLogin(String email, String otp) {
            String storedOtp = otpStorage.get(email);
            return storedOtp != null && storedOtp.equals(otp);
        }
    
        // Method to handle user login with OTP and hashed password



        public User validateOtpAndlogin(String email, String otpEmail, String otp, String password) {
            String storedOtp = otpStorage.get(otpEmail);
    
            if (storedOtp == null || !storedOtp.equals(otp)) {
                throw new IllegalArgumentException("Invalid or expired OTP");
            }
    
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new IllegalArgumentException("The provided email does not exist.");
            }
    
            String hashedInputPassword = hashPassword(password);
            if (!hashedInputPassword.equals(user.getPassword())) {
                throw new IllegalArgumentException("Incorrect password.");
            }
    
            otpStorage.remove(otpEmail);
                        return user;
        }
    

    
}
