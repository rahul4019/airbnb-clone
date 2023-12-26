const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: "Booking",
    required: true,
  },
  place: {
    type: mongoose.Schema.ObjectId,
    ref: "Place",
    required: true,
  },
  cleanliness: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  accuracy: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  checkIn: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  communication: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  location: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
