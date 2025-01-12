package com.Furniture.Furniture.Repository;
import com.Furniture.Furniture.model.Furniture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FurnitureRepository extends JpaRepository<Furniture, Integer> {
    @Query("SELECT f FROM Furniture f WHERE "
            + "LOWER(f.furnitureName) LIKE LOWER(CONCAT('%', :query, '%')) OR "
            + "LOWER(f.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Furniture> search(@Param("query") String query);

 

    @Query("SELECT SUM(f.price) FROM Furniture f")
    Double sumAllPrices();

    @Query("SELECT SUM(f.quantity) FROM Furniture f")
    Double sumAllQuantities();

    Page<Furniture> findAll(Pageable pageable);

   // Count total furniture items
   @Query("SELECT COUNT(f) FROM Furniture f")
   int countAll();
   
}
