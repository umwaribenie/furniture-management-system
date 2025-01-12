package com.Furniture.Furniture.Controller;

import com.Furniture.Furniture.Dto.SaleDto;
import com.Furniture.Furniture.Service.SaleService;
import com.Furniture.Furniture.model.Sale;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sale")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SaleController {

    private final SaleService saleService;

    // Create a new sale
    @PostMapping
    public ResponseEntity<?> createSale(@RequestBody SaleDto saleDto) {
        try {
            Sale createdSale = saleService.createSale(saleDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSale);
        } catch (EntityNotFoundException | IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    // Update an existing sale
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSale(@PathVariable int id, @RequestBody SaleDto saleDto) {
        try {
            Sale updatedSale = saleService.updateSale(id, saleDto);
            return ResponseEntity.ok(updatedSale);
        } catch (EntityNotFoundException | IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    // Get all sales (non-paginated)
    @GetMapping("/all")
    public ResponseEntity<List<Sale>> getAllSales() {
        return ResponseEntity.ok(saleService.getAllSales());
    }

    // Get sale by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getSaleById(@PathVariable int id) {
        try {
            return ResponseEntity.ok(saleService.getSaleById(id));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }

    // Get paginated sales
    @GetMapping
    public ResponseEntity<Page<Sale>> getSales(@RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "5") int size) {
        PageRequest pageable = PageRequest.of(page, size);
        Page<Sale> sales = saleService.getSales(pageable);
        return ResponseEntity.ok(sales);
    }

    // Delete a sale
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSale(@PathVariable int id) {
        try {
            saleService.deleteSale(id);
            return ResponseEntity.ok("Sale deleted successfully");
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
        }
    }
}
