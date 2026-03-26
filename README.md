# Travel Agency Website

A fully functional travel agency website built with Node.js, Express, and MongoDB. Users can browse travel packages, create accounts, make bookings, and manage their reservations. Admins can manage packages and bookings.

## Features

### User Features
- **Browse Packages**: View all available travel packages
- **Package Details**: See detailed information about each package
- **User Authentication**: Register and login to manage bookings
- **Booking System**: Book travel packages with passenger details
- **My Bookings**: View and cancel own bookings
- **Search Functionality**: Search packages by destination and price

### Admin Features
- **Package Management**: Create, update, and delete travel packages
- **Booking Management**: View all user bookings and update their status
- **Admin Dashboard**: Access to all admin functionalities

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templating engine
- **Styling**: Custom CSS with responsive design
- **Authentication**: Session-based with bcryptjs for password hashing
- **Session Storage**: MongoDB with connect-mongo

## Project Structure

```
travel-agency/
├── config/
│   └── database.js          # Database connection configuration
├── models/
│   ├── Package.js           # Travel package schema
│   ├── Booking.js           # Booking schema
│   └── User.js              # User schema
├── controllers/
│   ├── packageController.js # Package logic
│   ├── bookingController.js # Booking logic
│   └── authController.js    # Authentication logic
├── routes/
│   ├── packages.js          # Package routes
│   ├── bookings.js          # Booking routes
│   └── auth.js              # Authentication routes
├── views/
│   ├── layout.ejs           # Main layout template
│   ├── index.ejs            # Home page
│   ├── packages.ejs         # Packages listing
│   ├── package-details.ejs  # Package details page
│   ├── login.ejs            # Login page
│   ├── register.ejs         # Registration page
│   ├── my-bookings.ejs      # User bookings
│   ├── admin-bookings.ejs   # Admin bookings management
│   ├── about.ejs            # About page
│   ├── contact.ejs          # Contact page
│   └── error.ejs            # Error page
├── public/
│   └── css/
│       └── style.css        # Stylesheet
├── server.js                # Main application file
├── package.json             # Project dependencies
├── .env                     # Environment variables
└── README.md               # This file
```

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- MongoDB (local or cloud database)

## Installation

### 1. Clone or Download the Project

```bash
cd travel-agency
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
- Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
- Create an account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string

### 4. Configure Environment Variables

Create or update the `.env` file in the project root with:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/travel-agency
NODE_ENV=development
SESSION_SECRET=your-secret-key-change-this-in-production
```

**For MongoDB Atlas, use:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/travel-agency?retryWrites=true&w=majority
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The application will start at `http://localhost:3000`

## Usage

### First-Time Setup

1. **Register a User Account**
   - Click "Register" in the navigation
   - Fill in your details and create an account

2. **Browse Packages**
   - Go to "Packages" or browse featured destinations on the home page
   - Click "View Details" to see full package information

3. **Book a Package**
   - Click "Book Now" on a package details page
   - Select number of people
   - Fill in passenger information
   - Complete the booking

4. **View Your Bookings**
   - Click "My Bookings" (only visible when logged in)
   - Cancel bookings if needed

### Admin Features

To enable admin features, manually update a user in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

Then admin can:
- Create packages via POST to `/packages/create`
- Manage all bookings at `/bookings/all`
- Update package details and availability

## Sample Data

To populate the database with sample packages, connect to MongoDB and run:

```javascript
db.packages.insertMany([
  {
    name: "Paradise Beach Escape",
    destination: "Maldives",
    description: "Enjoy pristine beaches and crystal clear waters",
    price: 1200,
    duration: 5,
    maxParticipants: 4,
    highlights: ["Water Sports", "Snorkeling", "Beach Resort", "Spa"],
    departureDate: new Date("2026-04-15"),
    available: true
  },
  {
    name: "Mountain Adventure",
    destination: "Swiss Alps",
    description: "Experience thrilling mountain trekking and skiing",
    price: 1500,
    duration: 7,
    maxParticipants: 6,
    highlights: ["Trekking", "Skiing", "Alpine Views", "Local Culture"],
    departureDate: new Date("2026-05-01"),
    available: true
  },
  {
    name: "Cultural Heritage Tour",
    destination: "Egypt",
    description: "Explore historic pyramids and ancient temples",
    price: 950,
    duration: 6,
    maxParticipants: 5,
    highlights: ["Pyramids", "Nile Cruise", "Museum", "Local Markets"],
    departureDate: new Date("2026-03-20"),
    available: true
  }
])
```

## API Endpoints

### Authentication
- `GET /auth/login` - Login page
- `POST /auth/login` - Process login
- `GET /auth/register` - Registration page
- `POST /auth/register` - Process registration
- `GET /auth/logout` - Logout user

### Packages
- `GET /packages` - List all packages
- `GET /packages/details/:id` - Get package details
- `GET /packages/search` - Search packages
- `POST /packages/create` - Create package (Admin)
- `PUT /packages/update/:id` - Update package (Admin)
- `DELETE /packages/delete/:id` - Delete package (Admin)

### Bookings
- `POST /bookings/create` - Create booking
- `GET /bookings/my-bookings` - Get user's bookings
- `PUT /bookings/cancel/:id` - Cancel booking
- `GET /bookings/all` - Get all bookings (Admin)
- `PUT /bookings/status/:id` - Update booking status (Admin)

## Security Considerations

1. **Change SESSION_SECRET** in production
2. **Use HTTPS** in production
3. **Implement CSRF protection** for forms
4. **Validate all user inputs** on both client and server
5. **Use environment variables** for sensitive data
6. **Implement rate limiting** for authentication endpoints
7. **Add input sanitization** to prevent XSS attacks

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access (for Atlas)

### Port Already in Use
- Change PORT in `.env` or kill process using the port

### Session Issues
- Clear browser cookies/cache
- Restart the server
- Check MongoDB connection

## Future Enhancements

- Email notifications for bookings
- Payment gateway integration
- Package reviews and ratings
- Discount and promo codes
- Multi-language support
- User profile management
- Advanced search filters
- Booking analytics dashboard
- Real-time availability updates

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please check the code comments or contact the development team.
