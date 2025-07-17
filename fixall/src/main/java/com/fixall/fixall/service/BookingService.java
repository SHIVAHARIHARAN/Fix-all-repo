package com.fixall.fixall.service;

import com.fixall.fixall.model.Booking;
import com.fixall.fixall.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    public List<Booking> getBookingsByUsername(String username) {
        return bookingRepository.findByCustomerNameIgnoreCase(username);
    }
}
