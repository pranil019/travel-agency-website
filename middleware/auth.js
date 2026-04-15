function requestWantsHtml(req) {
  const accepted = req.headers.accept || '';
  if (!accepted) return true;
  if (req.xhr) return false;
  return accepted.includes('text/html');
}

function requireAuth(req, res, next) {
  if (req.session && req.session.user) return next();

  if (requestWantsHtml(req)) {
    return res.redirect('/auth/login');
  }

  return res.status(401).json({ message: 'Authentication required' });
}

function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.isAdmin) return next();

  if (requestWantsHtml(req)) {
    return res.status(403).render('error', { message: 'Access denied', title: 'Error' });
  }

  return res.status(403).json({ message: 'Admin access required' });
}

module.exports = { requireAuth, requireAdmin };

