const User = require('../models/User');
const { logActivity } = require('../utils/activityLogger');

function renderRegister(res, options = {}) {
  return res.render('register', {
    title: 'Register',
    message: '',
    selectedRole: 'user',
    ...options,
  });
}

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, address, accountType, adminKey } = req.body;
    const selectedRole = accountType === 'admin' ? 'admin' : 'user';
    const adminRegistrationKey = process.env.ADMIN_REGISTRATION_KEY;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).render('register', {
        title: 'Register',
        message: 'An account with this email already exists',
        selectedRole,
      });
    }

    if (selectedRole === 'admin' && adminRegistrationKey && adminKey !== adminRegistrationKey) {
      return res.status(400).render('register', {
        title: 'Register',
        message: 'Invalid admin registration code',
        selectedRole: 'admin',
      });
    }

    user = new User({
      name,
      email,
      phone,
      password,
      address,
      isAdmin: selectedRole === 'admin',
    });

    await user.save();

    await logActivity(req, {
      actionType: selectedRole === 'admin' ? 'admin_register' : 'user_register',
      actorType: 'guest',
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      entityType: 'user',
      entityId: user._id,
      status: 'success',
    });

    req.session.user = { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };

    return res.redirect(user.isAdmin ? '/admin' : '/dashboard');
  } catch (error) {
    console.error(error);
    return res.status(500).render('register', {
      title: 'Register',
      message: 'Error registering user',
      selectedRole: 'user',
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.render('login', {
        title: role === 'admin' ? 'Admin Login' : 'Login',
        message: 'Please provide email and password',
        role: role || null,
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.render('login', {
        title: role === 'admin' ? 'Admin Login' : 'Login',
        message: 'Invalid credentials',
        role: role || null,
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      await logActivity(req, {
        actionType: 'user_login_failed',
        actorType: 'guest',
        userEmail: email,
        status: 'invalid_password',
      });

      return res.render('login', {
        title: role === 'admin' ? 'Admin Login' : 'Login',
        message: 'Invalid credentials',
        role: role || null,
      });
    }

    if (role === 'admin' && !user.isAdmin) {
      await logActivity(req, {
        actionType: 'admin_login_failed',
        actorType: 'user',
        userId: user._id,
        userEmail: user.email,
        userName: user.name,
        entityType: 'user',
        entityId: user._id,
        status: 'not_admin',
      });

      return res.render('login', {
        title: 'Admin Login',
        message: 'This account is not an admin account',
        role: 'admin',
      });
    }

    req.session.user = { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };

    await logActivity(req, {
      actionType: user.isAdmin ? 'admin_login' : 'user_login',
      actorType: user.isAdmin ? 'admin' : 'user',
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      entityType: 'user',
      entityId: user._id,
      status: 'success',
    });

    if (user.isAdmin) return res.redirect('/admin');
    return res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { message: 'Error logging in', title: 'Login', role: null });
  }
};

// Logout user
exports.logout = (req, res) => {
  const sessionUser = req.session && req.session.user ? { ...req.session.user } : null;

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Error logging out' });
    }

    if (sessionUser) {
      logActivity(req, {
        actionType: sessionUser.isAdmin ? 'admin_logout' : 'user_logout',
        actorType: sessionUser.isAdmin ? 'admin' : 'user',
        userId: sessionUser._id,
        userEmail: sessionUser.email,
        userName: sessionUser.name,
        entityType: 'user',
        entityId: sessionUser._id,
        status: 'success',
      }).catch(() => {});
    }

    res.redirect('/');
  });
};

// Get login page
exports.getLoginPage = (req, res) => {
  const role = req.query.role === 'admin' ? 'admin' : req.query.role === 'user' ? 'user' : null;
  res.render('login', {
    title: role === 'admin' ? 'Admin Login' : 'Login',
    message: '',
    role,
  });
};

// Get register page
exports.getRegisterPage = (req, res) => {
  const selectedRole = req.query.role === 'admin' ? 'admin' : 'user';
  const adminRegistrationEnabled = Boolean(process.env.ADMIN_REGISTRATION_KEY);

  return renderRegister(res, {
    selectedRole,
    adminRegistrationEnabled,
  });
};
