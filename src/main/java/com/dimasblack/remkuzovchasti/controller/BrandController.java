package com.dimasblack.remkuzovchasti.controller;

import com.dimasblack.remkuzovchasti.model.AutoBrand;
import com.dimasblack.remkuzovchasti.service.AutoBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.IOUtils;

import java.io.IOException;

@RestController
@RequestMapping("/api/brand")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BrandController {

    @Autowired
    AutoBrandService autoBrandService;

    @GetMapping("/all")
    public Iterable<AutoBrand> allAutoBrands(){
        return autoBrandService.findAllBrands();
    }

    @GetMapping("{id}")
    public AutoBrand oneAutoBrand(@PathVariable("id") AutoBrand brand){
        return brand;
    }

    @PostMapping
    public AutoBrand createAutoBrand(@RequestParam("brand") String brand, @RequestParam("file") MultipartFile file) throws IOException {
        return autoBrandService.createBrand(brand, file);
    }

    @PutMapping("{id}")
    public AutoBrand updateAutoBrand(@PathVariable("id") AutoBrand brandFromDb, @RequestBody AutoBrand brand){
        return autoBrandService.updateBrand(brandFromDb, brand);
    }

    @DeleteMapping("{id}")
    public void deleteAutoBrand(@PathVariable("id") AutoBrand brand){
        autoBrandService.deleteBrand(brand);
    }


}

