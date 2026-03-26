const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Public routes
router.get('/', packageController.getAllPackages);
router.get('/details/:id', packageController.getPackageDetails);
router.get('/search', packageController.searchPackages);

// Admin routes
router.post('/create', packageController.createPackage);
router.put('/update/:id', packageController.updatePackage);
router.delete('/delete/:id', packageController.deletePackage);

module.exports = router;
