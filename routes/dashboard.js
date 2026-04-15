const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboardController');
const { requireAuth, requireAdmin } = require('../middleware/auth');

router.get('/dashboard', requireAuth, dashboardController.getUserDashboard);
router.get('/admin', requireAdmin, dashboardController.getAdminDashboard);

module.exports = router;

