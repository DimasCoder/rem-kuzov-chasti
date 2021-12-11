package com.dimasblack.remkuzovchasti.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(generator = "optimized-sequence")
    private Long id;

    private String productName;
    private int price;
    private String code;
    private boolean isAvailable;
    private int countOfSold;

    @OneToOne(cascade = CascadeType.ALL)
    private FileEntity file;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"products", "brand"})
    private AutoModel model;
}
