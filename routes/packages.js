const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { requireAdmin } = require('../middleware/auth');

// Public routes
router.get('/', packageController.getAllPackages);
router.get('/details/:id', packageController.getPackageDetails);
router.get('/search', packageController.searchPackages);

// Admin routes
router.post('/create', requireAdmin, packageController.createPackage);
router.put('/update/:id', requireAdmin, packageController.updatePackage);
router.delete('/delete/:id', requireAdmin, packageController.deletePackage);

module.exports = router;
