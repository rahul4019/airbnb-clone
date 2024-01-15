const Booking = require('../models/Booking');
const Place = require('../models/Place');


// Books a place
exports.createBookings = async (req, res) => {
  try {
    const userData = req.user;
    const { place, checkIn, checkOut, numOfGuests, name, phone, price } =
      req.body;

    // console.log(place);
    const isUserOwner = await Place.findOne({_id: place, owner: userData._id});

    if(isUserOwner){
      return res.status(400).json({
        message: 'As an owner you can\'t book this place.',
      });
    }

    
    // Check if the place is already booked for the specified dates
    const existingBooking = await Booking.findOne({
      place,
      $or: [
        { checkIn: { $lte: checkIn }, checkOut: { $gte: checkIn } },
        { checkIn: { $lte: checkOut }, checkOut: { $gte: checkOut } },
      ],
    });

    if (existingBooking && existingBooking.status !=="canceled") {

      // Place is already booked for the given dates
      return res.status(400).json({
        message: 'This place is already booked for the selected dates.',
      });
    }


    if (phone && !/^\d{10}$/g.test(phone)) {
      return res.status(400).json({
        message: 'Invalid phone number format',
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


/// Delete a booking 
exports.deleteBooking = async(req, res) => {
  try {
    const bookingId = req.params.id;

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
    const bookingId = req.params.id;

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
    const bookingId = req.params.id;


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


// confirm a user specific bookings
exports.confirmBookings = async (req, res) => {

  try{
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    // console.log(booking);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found.',
      });
    }

    if( booking.status !== 'pending'){
      return res.status(400).json({
        error: `Booking can not be confirmed. It is ${booking.status}`
      })
    }

    // checking any other person has already confirmed for same range
    const conflictingBooking = await Booking.findOne({
      place: booking.place,
      status: 'confirmed',
      $or: [
        {
          checkIn: { $lte: booking.checkIn },
          checkOut: { $gte: booking.checkIn },
        },
        {
          checkIn: { $lte: booking.checkOut },
          checkOut: { $gte: booking.checkOut },
        },
      ],
    });

    if (conflictingBooking) {
      return res.status(400).json({
        error: 'Another booking is already confirmed for the same date range.',
      });
    }

    booking.status = 'confirmed';

    await booking.save();
    res.status(200).json({
      message: 'Booking confirmed successfully.',
      booking,
    });

  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err
    })
  }
}


exports.completeBookings = async (req, res) => {

  try{
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found.',
      });
    }

    if( booking.status !== 'confirmed'){
      return res.status(400).json({
        error: `Booking can not be completed. It is ${booking.status}`
      })
    }

    booking.status = 'completed';

    await booking.save();
    res.status(200).json({
      message: 'Booking completed successfully.',
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

    res.status(200).json({ booking, success: true })


  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

exports.singleBooking = async (req, res) => {
  try {
    const userData = req.user;
    if (!userData) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to access this page!' });
    }

    const bookingId = req.params.id;

    const booking = await Booking.findById(bookingId).populate('place');
    if (booking.user.equals(userData._id)){
      res.status(200).json({ booking, success: true });
    }
    else{
      res.status(401).json({
        error: "You're not authorized to access this booking information" 
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Internal server error',
      error: err,
    });
  }
};

