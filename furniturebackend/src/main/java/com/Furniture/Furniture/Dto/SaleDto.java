package com.Furniture.Furniture.Dto;
import java.sql.Date;
import lombok.Data;
@Data
public class SaleDto {    

    private int saleId;   
   
    private int furnitureId; 

    private String customerName;

    private int quantity;

    private double totalPrice;

    private Date date;
    
    private String description;
  
    
}
