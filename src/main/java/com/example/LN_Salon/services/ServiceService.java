package com.example.LN_Salon.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.LN_Salon.repositories.ServiceRepository;

@Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<com.example.LN_Salon.models.Service> findAll() {
        return serviceRepository.findAll();
    }

    public Optional<com.example.LN_Salon.models.Service> findById(Long id) {
        return serviceRepository.findById(id);
    }

    public com.example.LN_Salon.models.Service save(com.example.LN_Salon.models.Service service) {
        return serviceRepository.save(service);
    }
}
