const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
  },
  price: {
    type: Number,
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
