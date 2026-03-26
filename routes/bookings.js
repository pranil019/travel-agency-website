const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// User routes
router.post('/create', bookingController.createBooking);
router.get('/my-bookings', bookingController.getUserBookings);
router.put('/cancel/:id', bookingController.cancelBooking);

// Admin routes
router.get('/all', bookingController.getAllBookings);
router.put('/status/:id', bookingController.updateBookingStatus);

module.exports = router;
