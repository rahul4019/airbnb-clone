const Booking = require('../models/Booking');
const userFromToken = require('../utils/userFromToken');

exports.createBookings = async (req, res) => {
  try {
    const userData = userFromToken(req);
    const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
      req.body;

    const booking = await Booking.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      price,
    });

    res.status(200).json({
      booking,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.getBookings = async (req, res) => {
  try {
    console.log('In get bookings function');
    const userData = await userFromToken(req);
    res
      .status(200)
      .json(await Booking.find({ user: userData.id }).populate('place'));
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
