package com.example.LN_Salon.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.LN_Salon.models.Stylist;
import com.example.LN_Salon.repositories.StylistRepository;

@Service
public class StylistService {

    private final StylistRepository stylistRepository;

    public StylistService(StylistRepository stylistRepository) {
        this.stylistRepository = stylistRepository;
    }

    public List<Stylist> findAll() {
        return stylistRepository.findAll();
    }

    public Optional<Stylist> findById(Long id) {
        return stylistRepository.findById(id);
    }

    public Stylist save(Stylist stylist) {
        return stylistRepository.save(stylist);
    }
}
