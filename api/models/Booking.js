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
    required: [true, "Check-in date is required"],
  },
  checkOut: {
    type: Date,
    required: [true, "Check-out date is required"],
    validate: {
      validator: function (value) {
        // Check if the check-out date is after the check-in date
        return value >= this.checkIn;
      },
      message: "Check-out date must be after the check-in date",
    },
  },
  name: {
    type: String,
    required: [true, "Name is required"],
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
    required: [true, "Phone number is required"],

  },
  price: {
    type: Number,
    required: [true, "Price is required"],
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
