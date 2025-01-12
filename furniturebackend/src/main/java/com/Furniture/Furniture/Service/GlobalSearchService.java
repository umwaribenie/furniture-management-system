package com.Furniture.Furniture.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Furniture.Furniture.Repository.FurnitureRepository;
import com.Furniture.Furniture.Repository.SaleRepository;
@Service
public class GlobalSearchService {
    @Autowired
    private FurnitureRepository furnitureRepository;
    @Autowired
    private SaleRepository saleRepository;
    
    public Map<String, List<?>> search(String query) {
        Map<String, List<?>> results = new HashMap<>();
        if (query == null || query.trim().isEmpty()) {
            results.put("furnitures", List.of());
            results.put("sales", List.of());          
            return results;
        }
        results.put("furnitures", furnitureRepository.search(query));
        results.put("sales", saleRepository.search(query));
        return results;
    }
}
