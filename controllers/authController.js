const User = require('../models/User');

// Register user
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).render('register', { message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      phone,
      password,
      address,
    });

    await user.save();

    req.session.user = { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('register', { message: 'Error registering user', title: 'Register' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render('login', { message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.render('login', { message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.render('login', { message: 'Invalid credentials' });
    }

    req.session.user = { _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { message: 'Error logging in', title: 'Login' });
  }
};

// Logout user
exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/');
  });
};

// Get login page
exports.getLoginPage = (req, res) => {
  res.render('login', { title: 'Login', message: '' });
};

// Get register page
exports.getRegisterPage = (req, res) => {
  res.render('register', { title: 'Register', message: '' });
};
