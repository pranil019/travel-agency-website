const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');
const { requireAdmin } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

// Public routes
router.get('/', async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'packages_page_view',
			entityType: 'package_collection',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return packageController.getAllPackages(req, res, next);
});

router.get('/details/:id', packageController.getPackageDetails);

router.get('/search', async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'package_search_page_view',
			entityType: 'package_collection',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return packageController.searchPackages(req, res, next);
});

// Admin routes
router.post('/create', requireAdmin, packageController.createPackage);
router.put('/update/:id', requireAdmin, packageController.updatePackage);
router.delete('/delete/:id', requireAdmin, packageController.deletePackage);

module.exports = router;
