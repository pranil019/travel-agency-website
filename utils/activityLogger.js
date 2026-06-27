const ActivityLog = require('../models/ActivityLog');

function getActorType(req) {
  if (req.session && req.session.user) {
    return req.session.user.isAdmin ? 'admin' : 'user';
  }

  return 'guest';
}

async function logActivity(req, details = {}) {
  try {
    const user = req.session && req.session.user ? req.session.user : null;

    await ActivityLog.create({
      actionType: details.actionType,
      actorType: details.actorType || getActorType(req),
      userId: details.userId || (user ? user._id : null),
      userEmail: details.userEmail || (user ? user.email : ''),
      userName: details.userName || (user ? user.name : ''),
      entityType: details.entityType || '',
      entityId: details.entityId || null,
      method: req.method,
      path: req.originalUrl || req.url || '',
      status: details.status || '',
      metadata: details.metadata || {},
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || '',
      userAgent: req.headers['user-agent'] || '',
    });
  } catch (error) {
    console.error('Activity log error:', error.message);
  }
}

module.exports = { logActivity };