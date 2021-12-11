package com.dimasblack.remkuzovchasti.service;

import com.dimasblack.remkuzovchasti.model.AutoBrand;
import com.dimasblack.remkuzovchasti.model.AutoModel;
import com.dimasblack.remkuzovchasti.repo.AutoBrandRepo;
import com.dimasblack.remkuzovchasti.repo.AutoModelRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class AutoModelService {
    @Autowired
    AutoModelRepo autoModelRepo;

    @Autowired
    AutoBrandRepo autoBrandRepo;

    public Iterable<AutoModel> findAllModels(){
        return autoModelRepo.findAll(Sort.by(Sort.Direction.ASC, "modelName"));
    }

    public AutoModel createModel(String model, Long brand){
        AutoModel autoModel = new AutoModel();
        autoModel.setModelName(model);
        autoModel.setBrand(autoBrandRepo.getById(brand));
        return autoModelRepo.save(autoModel);
    }

    public AutoModel updateModel(AutoModel modelFromDb, AutoModel model){
        BeanUtils.copyProperties(model, modelFromDb, "id");
        return model;
    }

    public void deleteModel(AutoModel model){
        autoModelRepo.deleteModel(model.getId());
    }
}
