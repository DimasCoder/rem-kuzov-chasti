package com.dimasblack.remkuzovchasti.service;

import com.dimasblack.remkuzovchasti.model.FileEntity;
import com.dimasblack.remkuzovchasti.model.Product;
import com.dimasblack.remkuzovchasti.repo.AutoModelRepo;
import com.dimasblack.remkuzovchasti.repo.ProductRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ProductService {
    @Autowired
    ProductRepo productRepo;

    @Autowired
    AutoModelRepo autoModelRepo;

    public Iterable<Product> findAllProducts(){
        return productRepo.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    public Product createProduct(String productName, int price, String code, Long model, MultipartFile file) throws IOException {
        Product product = new Product();
        if(productRepo.getProductByProductName(productName) == null ) {
            product.setProductName(productName);
        }else{
            return null;
        }

        product.setPrice(price);
        product.setCode(code);
        product.setAvailable(true);
        product.setCountOfSold(0);
        product.setModel(autoModelRepo.getById(model));

        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(StringUtils.cleanPath(file.getOriginalFilename()));
        fileEntity.setContentType(file.getContentType());
        fileEntity.setData(file.getBytes());
        fileEntity.setSize(file.getSize());
        product.setFile(fileEntity);
        return productRepo.save(product);
    }

    public Product updateProduct(Product productFromDb, Product product){
        BeanUtils.copyProperties(product, productFromDb, "id");
        return product;
    }

    public void deleteProduct(Product product){

        productRepo.delete(product);
    }
}
