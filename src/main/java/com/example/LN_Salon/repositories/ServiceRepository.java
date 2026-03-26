package com.example.LN_Salon.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LN_Salon.models.Service;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
