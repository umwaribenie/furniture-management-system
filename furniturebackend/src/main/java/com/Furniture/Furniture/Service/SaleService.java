package com.Furniture.Furniture.Service;
import com.Furniture.Furniture.Dto.SaleDto;
import com.Furniture.Furniture.Repository.FurnitureRepository;
import com.Furniture.Furniture.Repository.SaleRepository;
import com.Furniture.Furniture.model.Furniture;
import com.Furniture.Furniture.model.Sale;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SaleService {

    private final SaleRepository saleRepository;
    private final FurnitureRepository furnitureRepository;

    // Create a new sale
    public Sale createSale(SaleDto saleDto) {
        Optional<Furniture> optionalFurniture = furnitureRepository.findById(saleDto.getFurnitureId());
        if (optionalFurniture.isEmpty()) {
            throw new EntityNotFoundException("Furniture not found");
        }

        Furniture furniture = optionalFurniture.get();
        if (furniture.getQuantity() < saleDto.getQuantity()) {
            throw new IllegalArgumentException("Insufficient furniture quantity");
        }

        // Update furniture quantity
        furniture.setQuantity(furniture.getQuantity() - saleDto.getQuantity());
        furnitureRepository.save(furniture);

        // Calculate total price
        double totalPrice = saleDto.getQuantity() * furniture.getPrice();

        // Create Sale object
        Sale sale = new Sale();
        sale.setFurniture(furniture);
        sale.setCustomerName(saleDto.getCustomerName());
        sale.setQuantity(saleDto.getQuantity());
        sale.setTotalPrice(totalPrice);
        sale.setDate(saleDto.getDate());
        sale.setDescription(saleDto.getDescription());

        return saleRepository.save(sale);
    }

    // Update an existing sale
    public Sale updateSale(int saleId, SaleDto saleDto) {
        Sale existingSale = saleRepository.findById(saleId)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found"));

        Furniture furniture = existingSale.getFurniture();
        Optional<Furniture> optionalFurniture = furnitureRepository.findById(saleDto.getFurnitureId());
        if (optionalFurniture.isEmpty()) {
            throw new EntityNotFoundException("Furniture not found");
        }

        Furniture newFurniture = optionalFurniture.get();

        // Adjust furniture quantities
        // Return previously sold quantity back to old furniture
        furniture.setQuantity(furniture.getQuantity() + existingSale.getQuantity());
        furnitureRepository.save(furniture);

        // Deduct new quantity from the new furniture
        if (newFurniture.getQuantity() < saleDto.getQuantity()) {
            throw new IllegalArgumentException("Insufficient furniture quantity");
        }
        newFurniture.setQuantity(newFurniture.getQuantity() - saleDto.getQuantity());
        furnitureRepository.save(newFurniture);

        // Update sale details
        existingSale.setFurniture(newFurniture);
        existingSale.setCustomerName(saleDto.getCustomerName());
        existingSale.setQuantity(saleDto.getQuantity());
        existingSale.setTotalPrice(saleDto.getQuantity() * newFurniture.getPrice());
        existingSale.setDate(saleDto.getDate());
        existingSale.setDescription(saleDto.getDescription());

        return saleRepository.save(existingSale);
    }

    // Get all sales (non-paginated)
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    // Get sale by ID
    public Sale getSaleById(int id) {
        return saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found"));
    }

    // Get paginated sales
    public Page<Sale> getSales(Pageable pageable) {
        return saleRepository.findAll(pageable);
    }

    // Delete a sale
    public void deleteSale(int id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sale not found"));

        // Return previously sold quantity back to the furniture
        Furniture furniture = sale.getFurniture();
        furniture.setQuantity(furniture.getQuantity() + sale.getQuantity());
        furnitureRepository.save(furniture);

        saleRepository.deleteById(id);
    }
}
