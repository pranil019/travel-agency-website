const Booking = require('../models/Booking');
const Package = require('../models/Package');

exports.getUserDashboard = async (req, res) => {
  try {
    const packages = await Package.find({ available: true }).sort({ departureDate: 1 });
    const myRecentBookings = await Booking.find({ userId: req.session.user._id })
      .populate('packageId')
      .sort({ bookingDate: -1 })
      .limit(5);

    res.render('user-dashboard', {
      title: 'Dashboard',
      packages,
      myRecentBookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading dashboard', title: 'Error' });
  }
};

exports.getAdminDashboard = async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 }).limit(20);
    const recentBookings = await Booking.find()
      .populate('packageId')
      .populate('userId')
      .sort({ bookingDate: -1 })
      .limit(10);

    const [packageCount, bookingCount] = await Promise.all([
      Package.countDocuments(),
      Booking.countDocuments(),
    ]);

    res.render('admin-dashboard', {
      title: 'Admin Dashboard',
      packages,
      recentBookings,
      packageCount,
      bookingCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading admin dashboard', title: 'Error' });
  }
};

