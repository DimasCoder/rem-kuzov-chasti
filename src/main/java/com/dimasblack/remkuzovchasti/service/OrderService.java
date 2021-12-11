package com.dimasblack.remkuzovchasti.service;

import com.dimasblack.remkuzovchasti.model.Order;
import com.dimasblack.remkuzovchasti.model.Product;
import com.dimasblack.remkuzovchasti.model.User;
import com.dimasblack.remkuzovchasti.repo.OrderRepo;
import com.dimasblack.remkuzovchasti.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    @Autowired
    OrderRepo orderRepo;

    @Autowired
    ProductRepo productRepo;

    public Iterable<Order> findAllOrders(){
        return orderRepo.findAll(Sort.by(Sort.Direction.ASC, "id"));
    }

    /*public Order createOrder(String date, String customerName, String customerSurname, String phoneNumber,
                             String email, Long[] products){
        Order order = new Order();

    }*/
}
