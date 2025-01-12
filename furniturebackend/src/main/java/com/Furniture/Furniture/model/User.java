package com.Furniture.Furniture.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;  

    private String role; 

    private String firstName;

    private String lastName;

    private String phone;

    private String email;

    private String gender;  

    private String username;  
     
    private String password;
    
  
    
}
