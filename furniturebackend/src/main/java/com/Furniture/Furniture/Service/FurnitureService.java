package com.Furniture.Furniture.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.Furniture.Furniture.Dto.FurnitureDto;
import com.Furniture.Furniture.Repository.FurnitureRepository;
import com.Furniture.Furniture.model.Furniture;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FurnitureService  {
    private final FurnitureRepository furnitureRepository;

   // saving or updating furniture
    private Furniture saveOrUpdateFurniture(Furniture furniture, FurnitureDto furnitureDto) {
    furniture.setFurnitureName(furnitureDto.getFurnitureName());
    furniture.setPrice(furnitureDto.getPrice());
    furniture.setQuantity(furnitureDto.getQuantity());
    furniture.setDescription(furnitureDto.getDescription());
    return furnitureRepository.save(furniture);
}

    // creating new furniture 
    public Furniture postFurniture(FurnitureDto furnitureDto) {
        return saveOrUpdateFurniture(new Furniture(), furnitureDto);
    }

 
    // Updating furniture
    public Furniture updateFurniture(Integer id, FurnitureDto furnitureDto) {
        Optional<Furniture> optionalFurniture = furnitureRepository.findById(id);
        if (optionalFurniture.isPresent()) {
            return saveOrUpdateFurniture(optionalFurniture.get(), furnitureDto);
        } else {
            throw new EntityNotFoundException("Furniture not exists");
        }
    }
    // List of all non paginated furnitures 
    public List<Furniture> getAllFurnitures() {
        return furnitureRepository.findAll().stream()              
                .collect(Collectors.toList());
    }

    // Search furniture by ID
    public Furniture getFurnitureById(Integer id) {
        Optional<Furniture> optionalFurniture = furnitureRepository.findById(id);
        if (optionalFurniture.isPresent()) {
            return optionalFurniture.get();
        } else {
            throw new EntityNotFoundException("Furniture not exists");
        }
    }

   
    // all paginated furniture list
    public Page<Furniture> getFurnitures(Pageable pageable) {
        return furnitureRepository.findAll(pageable);
    }

    


    // Deleting furniture
    public void deleteFurniture(Integer id) {
        Optional<Furniture> optionalFurniture = furnitureRepository.findById(id);
        if (optionalFurniture.isPresent()) {
            furnitureRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Furniture not exists");
        }
    }


    
}
