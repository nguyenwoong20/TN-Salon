package com.example.LN_Salon.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.LN_Salon.models.Appointment;
import com.example.LN_Salon.models.AppointmentStatus;
import com.example.LN_Salon.repositories.AppointmentRepository;
import com.example.LN_Salon.repositories.CustomerRepository;
import com.example.LN_Salon.repositories.ServiceRepository;
import com.example.LN_Salon.repositories.StylistRepository;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final StylistRepository stylistRepository;
    private final ServiceRepository serviceRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            CustomerRepository customerRepository,
            StylistRepository stylistRepository,
            ServiceRepository serviceRepository) {
        this.appointmentRepository = appointmentRepository;
        this.customerRepository = customerRepository;
        this.stylistRepository = stylistRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public Appointment createAppointment(Appointment appointment) {
        validateAppointmentInput(appointment);

        com.example.LN_Salon.models.Customer customer = customerRepository
                .findById(appointment.getCustomer().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy khách hàng"));

        com.example.LN_Salon.models.Stylist stylist = stylistRepository
                .findById(appointment.getStylist().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thợ"));

        com.example.LN_Salon.models.Service service = serviceRepository
                .findById(appointment.getService().getId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy dịch vụ"));

        if (service.getDuration() == null || service.getDuration() <= 0) {
            throw new RuntimeException("Thời lượng dịch vụ không hợp lệ");
        }

        LocalDateTime newStart = appointment.getStartTime();
        if (newStart.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Không thể đặt lịch cho thời gian đã qua");
        }

        LocalDateTime newEnd = newStart.plusMinutes(service.getDuration());
        LocalDate targetDate = newStart.toLocalDate();

        List<Appointment> stylistAppointments = appointmentRepository.findByStylist(stylist);

        List<Appointment> overlappedAppointments = stylistAppointments.stream()
                .filter(existing -> existing.getStartTime() != null && existing.getEndTime() != null)
                .filter(existing -> Objects.equals(existing.getStartTime().toLocalDate(), targetDate))
                .filter(existing -> existing.getStatus() != AppointmentStatus.CANCELLED)
                .filter(existing -> newStart.isBefore(existing.getEndTime())
                        && newEnd.isAfter(existing.getStartTime()))
                .toList();

        if (!overlappedAppointments.isEmpty()) {
            LocalDateTime availableTime = overlappedAppointments.stream()
                    .map(Appointment::getEndTime)
                    .max(Comparator.naturalOrder())
                    .orElse(newEnd);

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM");
            String stylistName = stylist.getName() == null || stylist.getName().isBlank()
                    ? "N/A"
                    : stylist.getName();

            throw new RuntimeException(String.format(
                    "Thợ %s đang bận. Dự kiến sẽ rảnh vào lúc %s ngày %s. Vui lòng chọn khung giờ khác!",
                    stylistName,
                    availableTime.format(timeFormatter),
                    availableTime.format(dateFormatter)));
        }

        appointment.setCustomer(customer);
        appointment.setStylist(stylist);
        appointment.setService(service);
        appointment.setEndTime(newEnd);
        appointment.setStatus(AppointmentStatus.BOOKED);
        return appointmentRepository.save(appointment);
    }

    private void validateAppointmentInput(Appointment appointment) {
        if (appointment == null) {
            throw new RuntimeException("Dữ liệu lịch hẹn không hợp lệ");
        }

        if (appointment.getStylist() == null) {
            throw new RuntimeException("Vui lòng chọn thợ");
        }

        if (appointment.getCustomer() == null) {
            throw new RuntimeException("Vui lòng chọn khách hàng");
        }

        if (appointment.getService() == null) {
            throw new RuntimeException("Vui lòng chọn dịch vụ");
        }

        if (appointment.getCustomer().getId() == null) {
            throw new RuntimeException("ID khách hàng không hợp lệ");
        }

        if (appointment.getStylist().getId() == null) {
            throw new RuntimeException("ID thợ không hợp lệ");
        }

        if (appointment.getService().getId() == null) {
            throw new RuntimeException("ID dịch vụ không hợp lệ");
        }

        if (appointment.getStartTime() == null) {
            throw new RuntimeException("Vui lòng nhập thời gian bắt đầu");
        }
    }
}
