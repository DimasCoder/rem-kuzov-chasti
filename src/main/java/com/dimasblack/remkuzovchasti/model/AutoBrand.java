package com.dimasblack.remkuzovchasti.model;



import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class AutoBrand {

    @Id
    @GeneratedValue(generator="optimized-sequence")
    private Long id;

    private String brandName;

    private String image;

    @OneToOne(cascade = CascadeType.ALL)
    private FileEntity file;

    @OneToMany(mappedBy = "brand")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<AutoModel> models = new ArrayList<>();

}
