package com.example.LN_Salon.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LN_Salon.services.ServiceService;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(ServiceService serviceService) {
        this.serviceService = serviceService;
    }

    @GetMapping
    public List<com.example.LN_Salon.models.Service> getAllServices() {
        return serviceService.findAll();
    }

    @PostMapping
    public com.example.LN_Salon.models.Service createService(
            @RequestBody com.example.LN_Salon.models.Service service) {
        return serviceService.save(service);
    }
}
