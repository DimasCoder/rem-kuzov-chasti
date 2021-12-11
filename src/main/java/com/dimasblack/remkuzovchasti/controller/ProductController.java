package com.dimasblack.remkuzovchasti.controller;

import com.dimasblack.remkuzovchasti.model.AutoModel;
import com.dimasblack.remkuzovchasti.model.Product;
import com.dimasblack.remkuzovchasti.repo.AutoModelRepo;
import com.dimasblack.remkuzovchasti.repo.ProductRepo;
import com.dimasblack.remkuzovchasti.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductRepo productRepo;

    @Autowired
    AutoModelRepo autoModelRepo;

    @GetMapping("/products")
    public ResponseEntity<Map<String, Object>> getAllProducts(
            @RequestParam(required = false) String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size,
            @RequestParam(defaultValue = "0") Long brand,
            @RequestParam(defaultValue = "0") Long model
    ) {
        try {
            List<Product> products = new ArrayList<Product>();
            Pageable paging = PageRequest.of(page, size);

            Page<Product> pageProd;
            if (name == null && model == 0)
                pageProd = productRepo.findAll(paging);
            else if(name == null && model != 0 && brand != 0)
                pageProd = productRepo.getProductByModelandBrand(brand, model, paging);
            else if(name != null && model == 0)
                pageProd = productRepo.findByProductNameContaining(name, paging);
            else
                pageProd = productRepo.getProductsByProductNameContainingAndModel(name, autoModelRepo.getById(model), paging);

            products = pageProd.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("products", products);
            response.put("currentPage", pageProd.getNumber());
            response.put("totalItems", pageProd.getTotalElements());
            response.put("totalPages", pageProd.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/products/available")
    public ResponseEntity<Map<String, Object>> findByAvailable(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
    ) {
        try {
            List<Product> products = new ArrayList<Product>();
            Pageable paging = PageRequest.of(page, size);

            Page<Product> pageProd = productRepo.findByAvailable(true, paging);
            products = pageProd.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("products", products);
            response.put("currentPage", pageProd.getNumber());
            response.put("totalItems", pageProd.getTotalElements());
            response.put("totalPages", pageProd.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/products/all")
    public Iterable<Product> allProducts() {
        return productService.findAllProducts();
    }

    @GetMapping("/products/{id}")
    public Product oneProduct(@PathVariable("id") Product product) {
        return product;
    }


    @PostMapping("/products")
    public Product createProduct(@RequestParam("productName") String productName,
                                 @RequestParam("price") int price,
                                 @RequestParam("code") String code,
                                 @RequestParam("model") Long model,
                                 @RequestParam("file") MultipartFile file) throws IOException {
        return productService.createProduct(productName, price, code, model, file);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable("id") Product productFromDb, @RequestBody Product product) {
        return productService.updateProduct(productFromDb, product);
    }

    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable("id") Product product) {
        productService.deleteProduct(product);
    }
}
