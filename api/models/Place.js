const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Owner is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  photos: [{ type: String }],
  description: {
    type: String,
  },
  perks: [{ type: String }],
  extraInfo: {
    type: String,
  },
  maxGuests: {
    type: Number,
    validate: {
      validator: function (value) {
        // Validate that maxGuests is a positive integer
        return Number.isInteger(value) && value > 0;
      },
      message: "Max guests must be a positive integer",
    },
  },
  price: {
    type: Number,
    validate: {
      validator: function (value) {
        // Validate that price is a positive number
        return value >= 0;
      },
      message: "Price must be a non-negative number",
    },
  },
  cleanlinessRating: {
    type: Number,
    default: 0,
  },
  accuracyRating: {
    type: Number,
    default: 0,
  },
  checkInRating: {
    type: Number,
    default: 0,
  },
  communicationRating: {
    type: Number,
    default: 0,
  },
  locationRating: {
    type: Number,
    default: 0,
  },
  valueRating: {
    type: Number,
    default: 0,
  },

});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
