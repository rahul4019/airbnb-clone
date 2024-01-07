const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  place: {
    type: mongoose.Schema.ObjectId,
    ref: "Place",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        // Basic phone number format validation using a regular expression
        return /^\d{10}$/g.test(v);
      },
      message: 'Invalid phone number format',
    },
    required: true,

  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending","confirmed","completed","canceled"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  review: {
    type: mongoose.Schema.ObjectId,
    ref: "Review",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
