# TN-Salon

## Project Overview
Java Spring Boot project for salon management.

## Current Domain Model Status
Implemented JPA + Lombok entities in package `com.example.LN_Salon.models`:
- `Stylist`
- `Service`
- `Appointment`
- Supporting entity: `Customer`
- Enums: `StylistStatus`, `AppointmentStatus`

## Implemented Relationships
- `Appointment` -> `Customer` (`@ManyToOne`, `@JoinColumn(name = "customer_id")`)
- `Appointment` -> `Stylist` (`@ManyToOne`, `@JoinColumn(name = "stylist_id")`)
- `Appointment` -> `Service` (`@ManyToOne`, `@JoinColumn(name = "service_id")`)

## Repository Layer Status
Implemented repository interfaces in package `com.example.LN_Salon.repositories`:
- `CustomerRepository` extends `JpaRepository<Customer, Long>`
- `StylistRepository` extends `JpaRepository<Stylist, Long>`
- `ServiceRepository` extends `JpaRepository<Service, Long>`
- `AppointmentRepository` extends `JpaRepository<Appointment, Long>`

Custom methods in `AppointmentRepository`:
- `List<Appointment> findByStylist(Stylist stylist)`
- `List<Appointment> findByCustomer(Customer customer)`

## Service Layer Status
Implemented service classes in package `com.example.LN_Salon.services`:
- `CustomerService`: `findAll`, `findById`, `save`
- `StylistService`: `findAll`, `findById`, `save`
- `ServiceService`: `findAll`, `findById`, `save`
- `AppointmentService`: `findAll`, `findById`, `save`, `createAppointment`

`ServiceService` naming collision handling:
- Uses fully qualified type `com.example.LN_Salon.models.Service` in method signatures to avoid collision with Spring `@Service`.

`createAppointment` business rules:
- Validate input appointment and start/end time
- Get all appointments of the selected stylist
- Check overlap in the same day with condition: `newStart < existingEnd && newEnd > existingStart`
- Ignore cancelled appointments when checking overlap
- Throw `RuntimeException("Thợ đã có lịch trong khung giờ này")` if overlapped
- Set status to `BOOKED` and save if no overlap

## Controller Layer Status
Implemented REST controllers in package `com.example.LN_Salon.controllers`:
- `CustomerController`
	- `GET /api/customers`
	- `POST /api/customers`
- `StylistController`
	- `GET /api/stylists`
	- `POST /api/stylists`
- `ServiceController`
	- `GET /api/services`
	- `POST /api/services`
	- Uses fully qualified type `com.example.LN_Salon.models.Service` to avoid naming collision.
- `AppointmentController`
	- `POST /api/appointments`
	- Calls `AppointmentService.createAppointment` to enforce overlap validation.

## Notes
- `AppointmentStatus`: `BOOKED`, `COMPLETED`, `CANCELLED`
- `StylistStatus`: `AVAILABLE`, `BUSY`
- Main package and entities are aligned under `com.example.LN_Salon`.
