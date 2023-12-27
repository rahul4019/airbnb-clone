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




exports.createReview = async (req, res) => {

    try {

        const userData = req.user;
        // const bookingId = req.params.bookingId;
        // const placeId = req.params.placeId;
        const {booking, place, cleanliness, accuracy, checkIn, 
            communication, location, value, comment,} = req.body;


        const existingReview = await Review.find({user: userData._id, booking, place})

        if(existingReview.length > 0){
            return res.status(400).json({
                error: "Review already exists"
            });
        }

        const review = await Review.create({
            user: userData._id,
            booking,
            place,
            cleanliness,
            accuracy,
            checkIn,
            communication,
            location,
            value,
            comment,
        });

        if(review){
            updateAverageRatings(place);
            // console.log(review);
        }

        res.status(200).json({
            message: "Successfully added a new review"
        })
        

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err,
            message: "Internal Server Error",
        });
    }
}

exports.getReviews = async (req, res) => {

    try {
        const reviews = await Review.find();
        if (reviews){
            res.status(200).json(reviews);
        }
        else{
            res.status(404).json({
                message: "No reviews Found"
            })
        }
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Internal Server Error",
        });
    }
}


exports.getPlaceReviews = async (req, res) => {

    try {
        const placeId = req.params.placeId;
        const reviews = await Review.find({
            place: placeId
        });
        res.status(200).json(reviews);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Internal Server Error",
        });
    }
}

exports.getUserReviews = async (req,res) => {
    try {
        const userData = req.user;
        const reviews = await Review.find({
            user : userData._id
        }
        );
        res.status(200).json(reviews);
    }
    catch (err){
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Internal Server Error",
        });
    }
}

exports.deleteReview = async (req, res) => {
    try {
        const userData = req.user;
        const reviewId = req.params.id;
        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            return res.status(404).json({ error: "Review not found" });
        }
        if (deletedReview){
            updateAverageRatings(deletedReview.place);
        }
        res.status(200).json({
            message:"Review Deleted Successfully"
        });

    }
    catch (err){
        console.log(err);
        res.status(500).json({
            error: err,
            message: "Internal Server Error",
        });
    }
}

exports.updateReview = async (req, res) => {
    try {
        const userData = req.user;
        const reviewId = req.params.id;
        const updateValues = {
            ...req.body,
            user: userData._id,
        }
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            {
                $set: updateValues,
            },
            { new: true }
        )
        if(updatedReview){
            // console.log(updatedReview);
            updateAverageRatings(updatedReview.place);
        }
        
        res.status(200).json({
            message:"Review Updated Successfully"
        });

    } catch (err){
        console.error(err);
        res.status(500).json({
            error: err,
            message: "Internal Server Error",
        });
    }   
}


