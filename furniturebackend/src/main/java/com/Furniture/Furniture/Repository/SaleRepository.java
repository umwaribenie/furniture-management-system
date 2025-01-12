package com.Furniture.Furniture.Repository;
import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Furniture.Furniture.model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Integer> {
       @Query("SELECT s FROM Sale s JOIN FETCH s.furniture f WHERE "
            + "LOWER(f.furnitureName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR "
            + "LOWER(s.description) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Sale> search(@Param("keyword") String keyword);



    @Query("SELECT SUM(s.totalPrice) FROM Sale s")
    Double sumAllSalesPrices();

    Page<Sale> findAll(Pageable pageable);

    List<Sale> findByDateBetween(Date beginningDate, Date endingDate);

      // Count total sales
      @Query("SELECT COUNT(s) FROM Sale s")
      int countAll();
}
