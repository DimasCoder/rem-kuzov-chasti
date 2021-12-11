package com.dimasblack.remkuzovchasti.repo;

import com.dimasblack.remkuzovchasti.model.AutoBrand;
import com.dimasblack.remkuzovchasti.model.AutoModel;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AutoModelRepo extends JpaRepository<AutoModel, Long> {

    AutoModel getById(Long id);
    Iterable<AutoModel> getAutoModelsByBrand(AutoBrand brand);

    @Transactional
    @Modifying
    @Query(value = "delete from auto_model where id = :id",
            nativeQuery = true)
    void deleteModel(@Param("id") Long id);
}
