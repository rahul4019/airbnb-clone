const express = require('express');
const router = express.Router();

const {
  createBookings,
  getBookings,
} = require('../controllers/bookingController');

router.route('/').get(getBookings).post(createBookings);

module.exports = router;
