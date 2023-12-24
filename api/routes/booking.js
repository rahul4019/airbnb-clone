const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
  createBookings,
  getBookings,
  deleteBooking,
  cancelBookings,
  completeBookings,
  confirmBookings,
} = require('../controllers/bookingController');

// Protected routes (user must be logged in)
router.route('/').get(isLoggedIn, getBookings).post(isLoggedIn, createBookings);
router.route('/delete/:id').delete(isLoggedIn, deleteBooking);
router.route('/cancel/:id').patch(isLoggedIn,cancelBookings);
router.route('/confirm/:id').patch(isLoggedIn,confirmBookings);
router.route('/complete/:id').patch(isLoggedIn,completeBookings);

module.exports = router;
