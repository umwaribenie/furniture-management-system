    package com.Furniture.Furniture.Controller;
    import org.springframework.data.domain.Page;
    import org.springframework.data.domain.PageRequest;
    import org.springframework.http.HttpStatus;
    import com.Furniture.Furniture.Service.FurnitureService;
    import com.Furniture.Furniture.model.Furniture;
    import jakarta.persistence.EntityNotFoundException;
    import lombok.RequiredArgsConstructor;
    import org.springframework.web.bind.annotation.PathVariable;
    import org.springframework.web.bind.annotation.PostMapping;
    import org.springframework.web.bind.annotation.PutMapping;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.CrossOrigin;
    import org.springframework.web.bind.annotation.DeleteMapping;
    import org.springframework.web.bind.annotation.GetMapping;
    import org.springframework.web.bind.annotation.RequestBody;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestParam;
    import org.springframework.web.bind.annotation.RestController;
    import com.Furniture.Furniture.Dto.FurnitureDto;
    @RestController
    @RequestMapping("/api/furniture")
    @RequiredArgsConstructor
    @CrossOrigin("*")
    public class FurnitureController {
        private final FurnitureService furnitureService;
            // Get paginated furniture list
            @GetMapping
            public ResponseEntity<Page<Furniture>> getFurnitures(@RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "5") int size) {
                PageRequest pageable = PageRequest.of(page, size);
                Page<Furniture> furnitures = furnitureService.getFurnitures(pageable);
                return ResponseEntity.ok(furnitures);
            }
        
        

        // Get all furniture (non-paginated)
        @GetMapping("/all")
        public ResponseEntity<?> getAllFurnitures() {
            return ResponseEntity.ok(furnitureService.getAllFurnitures());
            }

            // Get furniture by ID
        @GetMapping("/{id}")
            public ResponseEntity<?> getFurnitureById(@PathVariable Integer id) {
                try {
                    return ResponseEntity.ok(furnitureService.getFurnitureById(id));
                } catch (EntityNotFoundException ex) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
                }
            }
        // saving furniture
        @PostMapping
        public ResponseEntity<?> postFurniture(@RequestBody FurnitureDto dto) {
            Furniture createdFurniture = furnitureService.postFurniture(dto);
            if (createdFurniture != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdFurniture);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
        }
            // Delete furniture
            @DeleteMapping("/{id}")
            public ResponseEntity<?> deleteFurniture(@PathVariable Integer id) {
                try {
                    furnitureService.deleteFurniture(id);
                    return ResponseEntity.ok("Furniture deleted successfully");
                } catch (EntityNotFoundException ex) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
                } catch (Exception e) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
                }
            }


        // Update furniture
        @PutMapping("/{id}")
        public ResponseEntity<?> updateFurniture(@PathVariable Integer id, @RequestBody FurnitureDto dto) {
            try {
                return ResponseEntity.ok(furnitureService.updateFurniture(id, dto));
            } catch (EntityNotFoundException ex) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
            }
        }


    }
