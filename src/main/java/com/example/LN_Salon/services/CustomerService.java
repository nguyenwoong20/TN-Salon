package com.example.LN_Salon.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.LN_Salon.models.Customer;
import com.example.LN_Salon.repositories.CustomerRepository;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer save(Customer customer) {
        return customerRepository.save(customer);
    }
}
