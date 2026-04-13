const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./config/database');
connectDB();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// View engine
app.set('view engine', 'ejs');

// Local variables middleware
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/packages', require('./routes/packages'));
app.use('/bookings', require('./routes/bookings'));

// Optional React frontend build (served at /app when built)
const clientDistPath = path.join(__dirname, 'client', 'dist');
const clientIndexHtml = path.join(clientDistPath, 'index.html');
if (fs.existsSync(clientIndexHtml)) {
  app.use('/app', express.static(clientDistPath, { index: false }));
  app.get('/app', (req, res) => res.sendFile(clientIndexHtml));
  app.get('/app/*', (req, res) => res.sendFile(clientIndexHtml));
}

// Home route
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to Travel Agency' });
});

// About route
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Contact route
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// 404 route
app.use((req, res) => {
  res.status(404).render('error', { message: 'Page not found', title: 'Error' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Server error occurred', title: 'Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
