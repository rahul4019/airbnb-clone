const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
  createBookings,
  getBookings,
  deleteBooking,
  cancelBookings
} = require('../controllers/bookingController');

// Protected routes (user must be logged in)
router.route('/').get(isLoggedIn, getBookings).post(isLoggedIn, createBookings);
router.route('/delete/:id').delete(isLoggedIn, deleteBooking);
router.route('/cancel/:id').put(isLoggedIn,cancelBookings);

module.exports = router;
