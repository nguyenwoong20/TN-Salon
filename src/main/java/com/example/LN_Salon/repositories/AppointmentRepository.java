package com.example.LN_Salon.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.LN_Salon.models.Appointment;
import com.example.LN_Salon.models.Customer;
import com.example.LN_Salon.models.Stylist;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByStylist(Stylist stylist);

    List<Appointment> findByCustomer(Customer customer);
}
