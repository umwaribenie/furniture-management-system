        package com.Furniture.Furniture.Service;
        import java.time.LocalDate;

        // import java.time.LocalDate;
        import org.springframework.stereotype.Service;
        import com.Furniture.Furniture.Dto.DataDto;
        import com.Furniture.Furniture.Dto.DiagramDto;
        import com.Furniture.Furniture.Repository.FurnitureRepository;
        import com.Furniture.Furniture.Repository.SaleRepository;
        import lombok.RequiredArgsConstructor;

        @Service
        @RequiredArgsConstructor
        public class DataService {
            private final FurnitureRepository furnitureRepository;

            private final SaleRepository saleRepository;   


            public DataDto getStats() {
                DataDto dataDto = new DataDto();

                // Get furniture table count
                int furnitureCount = furnitureRepository.countAll();

                // Get sale table count
                int saleCount = saleRepository.countAll();

                // Get sum of all prices
                Double sumOfPrices = furnitureRepository.sumAllPrices();

                // Get sum of all quantities
                Double sumOfQuantities = furnitureRepository.sumAllQuantities();

                // Calculate total price as sum of prices times sum of quantities
                Double furnitureTotalPrice = 0.0;
                if (sumOfPrices != null && sumOfQuantities != null) {
                    furnitureTotalPrice = sumOfPrices * sumOfQuantities;
                }

                // Calculate total price of all sales
                Double saleTotalPrice = saleRepository.sumAllSalesPrices();

                // Populate StatDto
                dataDto.setFurnitureCount(furnitureCount);
                dataDto.setSaleCount(saleCount);
                dataDto.setFurnitureTotalPrice(furnitureTotalPrice);
                dataDto.setSaleTotalPrice(saleTotalPrice != null ? saleTotalPrice : 0.0);





            


                return dataDto;
            }


            public DiagramDto getDiagram(){
                DiagramDto diagramDto = new DiagramDto();
                java.sql.Date endingDate = new java.sql.Date(System.currentTimeMillis());   
                LocalDate localEndDate = endingDate.toLocalDate();   
                LocalDate newDate = localEndDate.minusDays(60);         
                java.sql.Date beginningDate = java.sql.Date.valueOf(newDate);
                diagramDto.setSaleList(saleRepository.findByDateBetween(beginningDate, endingDate));

                return diagramDto;


            }





            
        }
