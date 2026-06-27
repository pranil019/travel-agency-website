const Package = require('../models/Package');
const { logActivity } = require('../utils/activityLogger');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({ available: true });

    await logActivity(req, {
      actionType: 'package_list_view',
      entityType: 'package_collection',
      status: 'success',
      metadata: { resultCount: packages.length },
    });

    res.render('packages', { packages, title: 'Travel Packages' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching packages', title: 'Error' });
  }
};

// Get single package details
exports.getPackageDetails = async (req, res) => {
  try {
    const packageItem = await Package.findById(req.params.id);
    if (!packageItem) {
      return res.status(404).render('error', { message: 'Package not found', title: 'Error' });
    }
    res.render('package-details', {
      package: packageItem,
      title: packageItem.name,
    });

    await logActivity(req, {
      actionType: 'package_view',
      entityType: 'package',
      entityId: packageItem._id,
      status: 'success',
      metadata: {
        packageName: packageItem.name,
        destination: packageItem.destination,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching package details', title: 'Error' });
  }
};

// Create package (Admin)
exports.createPackage = async (req, res) => {
  try {
    const { name, destination, description, price, duration, maxParticipants, highlights, departureDate } = req.body;

    const newPackage = new Package({
      name,
      destination,
      description,
      price,
      duration,
      maxParticipants,
      highlights: Array.isArray(highlights)
        ? highlights
        : String(highlights || '')
            .split(',')
            .map((h) => h.trim())
            .filter(Boolean),
      departureDate,
    });

    await newPackage.save();

    await logActivity(req, {
      actionType: 'package_create',
      actorType: 'admin',
      userId: req.session.user && req.session.user._id,
      userEmail: req.session.user && req.session.user.email,
      userName: req.session.user && req.session.user.name,
      entityType: 'package',
      entityId: newPackage._id,
      status: 'success',
      metadata: { packageName: newPackage.name, destination: newPackage.destination },
    });

    if ((req.headers.accept || '').includes('text/html')) {
      return res.redirect('/admin');
    }

    return res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating package', error: error.message });
  }
};

// Update package (Admin)
exports.updatePackage = async (req, res) => {
  try {
    const packageItem = await Package.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await logActivity(req, {
      actionType: 'package_update',
      actorType: 'admin',
      userId: req.session.user && req.session.user._id,
      userEmail: req.session.user && req.session.user.email,
      userName: req.session.user && req.session.user.name,
      entityType: 'package',
      entityId: packageItem._id,
      status: 'success',
      metadata: { packageName: packageItem.name },
    });

    res.json({ message: 'Package updated successfully', package: packageItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating package', error: error.message });
  }
};

// Delete package (Admin)
exports.deletePackage = async (req, res) => {
  try {
    const packageItem = await Package.findByIdAndDelete(req.params.id);

    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }

    await logActivity(req, {
      actionType: 'package_delete',
      actorType: 'admin',
      userId: req.session.user && req.session.user._id,
      userEmail: req.session.user && req.session.user.email,
      userName: req.session.user && req.session.user.name,
      entityType: 'package',
      entityId: packageItem._id,
      status: 'success',
      metadata: { packageName: packageItem.name },
    });

    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting package', error: error.message });
  }
};

// Search packages
exports.searchPackages = async (req, res) => {
  try {
    const { destination, maxPrice } = req.query;
    let filter = { available: true };

    if (destination) {
      filter.destination = { $regex: destination, $options: 'i' };
    }
    if (maxPrice) {
      filter.price = { $lte: maxPrice };
    }

    const packages = await Package.find(filter);

    await logActivity(req, {
      actionType: 'package_search',
      entityType: 'package_collection',
      status: 'success',
      metadata: { destination: destination || '', maxPrice: maxPrice || '' },
    });

    res.render('packages', { packages, title: 'Search Results' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error searching packages', title: 'Error' });
  }
};
