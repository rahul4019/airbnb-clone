const Booking = require('../models/Booking');


// Books a place
exports.createBookings = async (req, res) => {
  try {
    const userData = req.user;
    const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
      req.body;

    // Check if the place is already booked for the specified dates
    const existingBooking = await Booking.findOne({
      place,
      $or: [
        { checkIn: { $lte: checkIn }, checkOut: { $gte: checkIn } },
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkOut } },
      ],
    });

    if (existingBooking) {
      // Place is already booked for the given dates
      return res.status(400).json({
        message: 'This place is already booked for the selected dates.',
      });
    }

    // Create a new booking
    const booking = await Booking.create({
      user: userData.id,
      place,
      checkIn,
      checkOut,
      numOfGuests,
      name,
      phone,
      price,
      status: "pending",
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
// exports.createBookings = async (req, res) => {
//   try {
//     const userData = req.user;
//     const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
//       req.body;

//     const booking = await Booking.create({
//       user: userData.id,
//       place,
//       checkIn,
//       checkOut,
//       numOfGuests,
//       name,
//       phone,
//       price,
//     });

//     res.status(200).json({
//       booking,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: 'Internal server error',
//       error: err,
//     });
//   }
// };


/// Delete a booking 
exports.deleteBooking = async(req, res) => {
  try {
    const bookingId = req.id;

    const bookingObj = Booking.findById(bookingId);

    if(!bookingObj){
      return res.status(404).json({
        error:`Booking id ${bookingId} not found`
      })
    }


    await Booking.findByIdAndDelete(bookingId);

    return res.status(200).json({
      message: "Booking successfully deleted"
    })
  }  catch (err){
    return res.status(500).json({
      message: "Internal server error",
      error: err
    })
  }
}


exports.deleteUserBooking = async(req, res) => {
  try {
    const userId = req.user.id;
    const bookingId = req.id;

    const bookingObj = Booking.findById(bookingId);

    if(!bookingObj){
      return res.status(404).json({
        error:`Booking id ${bookingId} not found`
      })
    }

    if(bookingObj.user.id !== userId){
      return res.status(403).json({
        error: "You are not authorized to delete this booking"
      })
    }
    await Booking.findByIdAndDelete(bookingId);

    return res.status(200).json({
      message: "Booking successfully deleted"
    })
  }  catch (err){
    return res.status(500).json({
      message: "Internal server error",
      error: err
    })
  }
}


// cancel a user specific bookings
exports.cancelBookings = async (req, res) => {

  try{
    const userData = req.user;
    const bookingId = req.id;


    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found.',
      });
    }

    if( booking.status !== 'pending'){
      return res.status(400).json({
        error: "Booking can not be cancelled"
      })
    }

    booking.status = 'canceled';

    await booking.save();
    res.status(200).json({
      message: 'Booking canceled successfully.',
      booking,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err
    })
  }
}





// Returns user specific bookings
exports.getBookings = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const booking = await Booking.find({ user: userData.id }).populate('place')

    res
      .status(200).json({ booking, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};
