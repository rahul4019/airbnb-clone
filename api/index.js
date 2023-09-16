const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectWithDB = require('./config/db');
// const passportConfig = require('./config/passport')
// const passport = require('passport')
const cookieSession = require('cookie-session')
const cloudinary = require('cloudinary').v2;
const cookieParser = require('cookie-parser')

// connect with database
connectWithDB();

// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// For handling cookies
app.use(cookieParser())

// Initialize cookie-session middleware
app.use(cookieSession({
  name: 'session',
  maxAge: 3 * 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_SECRET],
  secure: true, // Only send over HTTPS
  sameSite: 'none', // Allow cross-origin requests
  httpOnly: true, 
}))

// middleware to handle json
app.use(express.json());

// CORS
//* development
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
// }));

//* production
app.use(cors({
  origin: 'https://airbnb-1.netlify.app',
  credentials: true,
}));

// use express router
app.use('/', require('./routes'));

app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log('Error in connecting to server: ', err);
  }
  console.log(`Server is running on port no. ${process.env.PORT}`);
});

module.exports = app;
