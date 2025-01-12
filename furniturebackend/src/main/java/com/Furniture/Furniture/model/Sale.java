package com.Furniture.Furniture.model;
import java.sql.Date;
import jakarta.persistence.Id;
import lombok.Data;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
@Entity
@Data
public class Sale {    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int saleId;    
    
    @ManyToOne
    @JoinColumn(name = "furnitureId")
    private Furniture furniture; 

    private String customerName;

    private int quantity;

    private double totalPrice;

    private Date date;
    
    private String description;
  
    
}
