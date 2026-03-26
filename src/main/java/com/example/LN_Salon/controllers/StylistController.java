package com.example.LN_Salon.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.LN_Salon.models.Stylist;
import com.example.LN_Salon.services.StylistService;

@RestController
@RequestMapping("/api/stylists")
public class StylistController {

    private final StylistService stylistService;

    public StylistController(StylistService stylistService) {
        this.stylistService = stylistService;
    }

    @GetMapping
    public List<Stylist> getAllStylists() {
        return stylistService.findAll();
    }

    @PostMapping
    public Stylist createStylist(@RequestBody Stylist stylist) {
        return stylistService.save(stylist);
    }
}
