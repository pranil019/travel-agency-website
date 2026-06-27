const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

// User routes
router.post('/create', requireAuth, bookingController.createBooking);
router.get('/my-bookings', requireAuth, async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'my_bookings_page_view',
			entityType: 'booking_collection',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return bookingController.getUserBookings(req, res, next);
});
router.put('/cancel/:id', requireAuth, bookingController.cancelBooking);

// Admin routes
router.get('/all', requireAuth, async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'admin_bookings_page_view',
			actorType: 'admin',
			entityType: 'booking_collection',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return bookingController.getAllBookings(req, res, next);
});
router.put('/status/:id', requireAuth, bookingController.updateBookingStatus);

module.exports = router;
