const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');
const { logActivity } = require('../utils/activityLogger');

router.get('/login', async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'login_page_view',
			entityType: 'auth_page',
			status: 'success',
			metadata: { role: req.query.role || null },
		});
	} catch (error) {
		return next(error);
	}

	return authController.getLoginPage(req, res, next);
});

router.get('/register', async (req, res, next) => {
	try {
		await logActivity(req, {
			actionType: 'register_page_view',
			entityType: 'auth_page',
			status: 'success',
		});
	} catch (error) {
		return next(error);
	}

	return authController.getRegisterPage(req, res, next);
});

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/logout', requireAuth, authController.logout);

module.exports = router;
