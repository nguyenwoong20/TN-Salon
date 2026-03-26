package com.example.LN_Salon.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LN_Salon.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
