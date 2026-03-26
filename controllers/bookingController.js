const Booking = require('../models/Booking');
const Package = require('../models/Package');

// Create booking
exports.createBooking = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Please login to make a booking' });
    }

    const { packageId, numberOfPeople, passengers } = req.body;

    const packageItem = await Package.findById(packageId);
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }

    if (numberOfPeople > packageItem.maxParticipants) {
      return res.status(400).json({ message: 'Number of people exceeds maximum participants' });
    }

    const totalPrice = packageItem.price * numberOfPeople;

    const booking = new Booking({
      packageId,
      userId: req.session.user._id,
      numberOfPeople,
      totalPrice,
      passengers,
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get user bookings
exports.getUserBookings = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/auth/login');
    }

    const bookings = await Booking.find({ userId: req.session.user._id }).populate('packageId');
    res.render('my-bookings', { bookings, title: 'My Bookings' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching bookings', title: 'Error' });
  }
};

// Cancel booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.session.user._id.toString() && !req.session.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

// Get all bookings (Admin)
exports.getAllBookings = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).render('error', { message: 'Access denied', title: 'Error' });
    }

    const bookings = await Booking.find().populate('packageId').populate('userId');
    res.render('admin-bookings', { bookings, title: 'All Bookings' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching bookings', title: 'Error' });
  }
};

// Update booking status (Admin)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};
