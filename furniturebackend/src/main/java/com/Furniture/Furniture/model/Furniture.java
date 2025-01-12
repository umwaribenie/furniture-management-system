package com.Furniture.Furniture.model;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
@Entity
@Data
public class Furniture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int furnitureId;   

    private String furnitureName;

    private double price;

    private int quantity;

    private String description;



}
