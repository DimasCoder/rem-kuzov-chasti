package com.dimasblack.remkuzovchasti.repo;

import com.dimasblack.remkuzovchasti.model.AutoModel;
import com.dimasblack.remkuzovchasti.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Product getProductByProductName(String productName);
    Page<Product> findByProductNameContaining(String productName, Pageable pageable);
    Page<Product> findByAvailable(boolean available, Pageable pageable);
    Page<Product> getProductsByModel(AutoModel model, Pageable pageable);
    Page<Product> getProductsByProductNameContainingAndModel(String productName, AutoModel model, Pageable pageable);

    @Query(value = "select product.*\n" +
            "from auto_brand \n" +
            "inner join auto_model\n" +
            "on auto_model.brand_id = auto_brand.id\n" +
            "and auto_brand.id = ?1\n" +
            "inner join product\n" +
            "on product.model_id = auto_model.id \n" +
            "and auto_model.id = ?2", nativeQuery = true)
    Page<Product> getProductByModelandBrand(Long brand, Long model, Pageable pageable);
}

