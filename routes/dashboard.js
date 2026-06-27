const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const { requireAuth, requireAdmin } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

router.get('/dashboard', requireAuth, async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'dashboard_view',
			entityType: 'dashboard',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return dashboardController.getUserDashboard(req, res, next);
});

router.get('/admin', requireAdmin, async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'admin_dashboard_view',
			actorType: 'admin',
			entityType: 'dashboard',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return dashboardController.getAdminDashboard(req, res, next);
});

module.exports = router;

