package com.dimasblack.remkuzovchasti.repo;

import com.dimasblack.remkuzovchasti.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
}
