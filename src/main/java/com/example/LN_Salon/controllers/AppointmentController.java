package com.example.LN_Salon.controllers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.LN_Salon.models.Appointment;
import com.example.LN_Salon.services.AppointmentService;
import com.example.LN_Salon.services.CustomerService;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final CustomerService customerService;

    public AppointmentController(AppointmentService appointmentService, CustomerService customerService) {
        this.appointmentService = appointmentService;
        this.customerService = customerService;
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentService.findAll();
    }

    @GetMapping("/my")
    public List<Appointment> getMyAppointments(@RequestParam String phone) {
        return customerService.findByPhone(phone)
                .map(c -> appointmentService.findByCustomerId(c.getId()))
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng với số điện thoại này"));
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Map<String, Object> body) {
        String name = (String) body.get("customerName");
        String phone = (String) body.get("customerPhone");

        com.example.LN_Salon.models.Customer customer = customerService.findOrCreate(name, phone);

        Appointment appointment = new Appointment();
        appointment.setCustomer(customer);

        if (body.get("stylistId") != null) {
            com.example.LN_Salon.models.Stylist s = new com.example.LN_Salon.models.Stylist();
            s.setId(Long.valueOf(body.get("stylistId").toString()));
            appointment.setStylist(s);
        }

        if (body.get("serviceId") != null) {
            com.example.LN_Salon.models.Service svc = new com.example.LN_Salon.models.Service();
            svc.setId(Long.valueOf(body.get("serviceId").toString()));
            appointment.setService(svc);
        }

        if (body.get("startTime") != null) {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm[:ss]");
            appointment.setStartTime(LocalDateTime.parse(body.get("startTime").toString(), fmt));
        }

        if (body.get("notes") != null) {
            appointment.setNotes(body.get("notes").toString());
        }

        return appointmentService.createAppointment(appointment);
    }

    @PatchMapping("/{id}/cancel")
    public Appointment cancelAppointment(@PathVariable Long id) {
        return appointmentService.cancelAppointment(id);
    }
}
