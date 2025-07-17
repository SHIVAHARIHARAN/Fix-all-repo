package com.fixall.fixall.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String customerName;

    @NotBlank
    @Column(nullable = false)
    private String contact;

    @NotBlank
    @Column(nullable = false)
    private String serviceType;

    @NotNull
    @Column(nullable = false)
    private LocalDate date;

    @NotBlank
    @Column(nullable = false)
    private String state;

    @NotBlank
    @Column(nullable = false)
    private String city;

    @NotBlank
    @Column(nullable = false, length = 500)
    private String address;

    @NotBlank
    @Column(nullable = false)
    private String status = "Pending"; // ✅ Default value

    public Booking() {}

    public Booking(String customerName, String contact, String serviceType, LocalDate date, String state, String city, String address) {
        this.customerName = customerName;
        this.contact = contact;
        this.serviceType = serviceType;
        this.date = date;
        this.state = state;
        this.city = city;
        this.address = address;
        this.status = "Pending";
    }

    // Getters and Setters
    public Long getId() { return id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
