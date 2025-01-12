package com.Furniture.Furniture.Controller;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import com.Furniture.Furniture.Service.GlobalSearchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController 
@RequestMapping("/api/global-search")
@RequiredArgsConstructor 
@CrossOrigin("*") 
public class GlobalSearchController {
    @Autowired
    private GlobalSearchService globalSearchService;
    @GetMapping
    public ResponseEntity<Map<String, List<?>>> search(@RequestParam String query) {
        Map<String, List<?>> results = globalSearchService.search(query);
        return ResponseEntity.ok(results);
    }
}
