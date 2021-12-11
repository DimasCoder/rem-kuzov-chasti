package com.dimasblack.remkuzovchasti.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue(generator="optimized-sequence")
    private Long id;

    private String date;
    private String customerName;
    private String customerSurname;
    private String phoneNumber;
    private String email;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(	name = "order_products",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private Set<Product> roles = new HashSet<>();
}
