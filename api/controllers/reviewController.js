const Review = require('../models/Review');
const Place = require('../models/Place');


async function updateAverageRatings(placeId) {
    const reviews = await Review.find({ place: placeId });
    const totalRatings = {
      cleanliness: 0,
      accuracy: 0,
      checkIn: 0,
      communication: 0,
      location: 0,
      value: 0,
    };
  
    reviews.forEach((review) => {
      totalRatings.cleanliness += review.cleanliness;
      totalRatings.accuracy += review.accuracy;
      totalRatings.checkIn += review.checkIn;
      totalRatings.communication += review.communication;
      totalRatings.location += review.location;
      totalRatings.value += review.value;
    });
  
    const averageRatings = {
      cleanlinessRating: totalRatings.cleanliness / reviews.length || 0,
      accuracyRating: totalRatings.accuracy / reviews.length || 0,
      checkInRating: totalRatings.checkIn / reviews.length || 0,
      communicationRating: totalRatings.communication / reviews.length || 0,
      locationRating: totalRatings.location / reviews.length || 0,
      valueRating: totalRatings.value / reviews.length || 0,
    };
  
    await Place.findByIdAndUpdate(placeId, averageRatings);
}










