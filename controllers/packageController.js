const Package = require('../models/Package');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({ available: true });
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
      highlights: highlights.split(',').map((h) => h.trim()),
      departureDate,
    });

    await newPackage.save();
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
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
    res.render('packages', { packages, title: 'Search Results' });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error searching packages', title: 'Error' });
  }
};
