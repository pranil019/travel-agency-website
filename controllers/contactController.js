const { logActivity } = require('../utils/activityLogger');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).render('contact', {
        title: 'Contact Us',
        message: 'Please fill in all fields before submitting.',
      });
    }

    await logActivity(req, {
      actionType: 'contact_submission',
      actorType: req.session && req.session.user ? (req.session.user.isAdmin ? 'admin' : 'user') : 'guest',
      userId: req.session && req.session.user ? req.session.user._id : null,
      userEmail: email,
      userName: name,
      entityType: 'contact_message',
      status: 'submitted',
      metadata: {
        subject,
        message,
      },
    });

    return res.render('contact', {
      title: 'Contact Us',
      message: 'Thanks for reaching out. Your message has been recorded.',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).render('contact', {
      title: 'Contact Us',
      message: 'Error submitting contact form. Please try again.',
    });
  }
};