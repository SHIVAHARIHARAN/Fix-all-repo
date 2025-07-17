package com.fixall.fixall.controllers;

import com.fixall.fixall.model.Booking;
import com.fixall.fixall.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @GetMapping("/user/{username}")
    public List<Booking> getBookingsByCustomerName(@PathVariable String username) {
        return bookingRepository.findByCustomerNameIgnoreCase(username);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("Pending"); // Set default
        return bookingRepository.save(booking);
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Booking booking = optionalBooking.get();
        String newStatus = request.get("status");
        if (newStatus != null) {
            booking.setStatus(newStatus);
            bookingRepository.save(booking);
            return ResponseEntity.ok(booking);
        }

        return ResponseEntity.badRequest().build();
    }
}
