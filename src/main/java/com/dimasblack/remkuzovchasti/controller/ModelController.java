package com.dimasblack.remkuzovchasti.controller;

import com.dimasblack.remkuzovchasti.model.AutoBrand;
import com.dimasblack.remkuzovchasti.model.AutoModel;
import com.dimasblack.remkuzovchasti.repo.AutoBrandRepo;
import com.dimasblack.remkuzovchasti.repo.AutoModelRepo;
import com.dimasblack.remkuzovchasti.service.AutoModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/api/model")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ModelController {
    @Autowired
    AutoModelService autoModelService;

    @Autowired
    AutoModelRepo autoModelRepo;

    @Autowired
    AutoBrandRepo autoBrandRepo;

    @GetMapping("/all")
    public Iterable<AutoModel> allAutoModels(){
        return autoModelService.findAllModels();
    }

    @GetMapping("{id}")
    public AutoModel oneAutoModel(@PathVariable("id") AutoModel model){
        return model;
    }

    @GetMapping
    public Iterable<AutoModel> filteredModels(@RequestParam("brand") Long brandId){
        AutoBrand brand = autoBrandRepo.getById(brandId);
        return autoModelRepo.getAutoModelsByBrand(brand);
    }


    @PostMapping
    public AutoModel createAutoModel(@RequestParam("model") String model, @RequestParam("brand") Long brand) throws IOException{
        return autoModelService.createModel(model, brand);
    }

    @PutMapping("{id}")
    public AutoModel updateAutoModel(@PathVariable("id") AutoModel modelFromDb, @RequestBody AutoModel model){
        return autoModelService.updateModel(modelFromDb, model);
    }

    @DeleteMapping("{id}")
    public void deleteAutoModel(@PathVariable("id") AutoModel model){
        autoModelService.deleteModel(model);
    }
}

