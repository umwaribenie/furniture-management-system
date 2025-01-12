package com.Furniture.Furniture.Controller;

import com.Furniture.Furniture.Dto.DataDto;
import com.Furniture.Furniture.Dto.DiagramDto;
import com.Furniture.Furniture.Service.DataService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/data")
@RequiredArgsConstructor
public class DataController {

    private final DataService dataService;

    // Endpoint for dashboard
    @GetMapping("/stats")
    public ResponseEntity<DataDto> getStats() {
        DataDto dataDto = dataService.getStats();
        return new ResponseEntity<>(dataDto, HttpStatus.OK);
    }

    // Endpoint to get graph data  sales data over the last 60 days

    @GetMapping("/graph")
    public ResponseEntity <DiagramDto> getDiagram(){
        return ResponseEntity.ok(dataService.getDiagram());
        
    }
}
