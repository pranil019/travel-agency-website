const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contactController');
const { logActivity } = require('../utils/activityLogger');

router.get('/', async (req, res, next) => {
  try {
    await logActivity(req, {
      actionType: 'contact_page_view',
      entityType: 'contact_page',
      status: 'success',
    });
  } catch (error) {
    return next(error);
  }

  return res.render('contact', { title: 'Contact Us', message: '' });
});

router.post('/', contactController.submitContactForm);

module.exports = router;