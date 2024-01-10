const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
    createReview,
    updateReview,
    getReviews,
    getPlaceReviews,
    getUserReviews,
    deleteReview,
    getBookingUserReview,
} = require('../controllers/reviewController');


router.route('/').get(getReviews).post(isLoggedIn, createReview);
router.route('/:id').delete(isLoggedIn,deleteReview);
router.route('/user').get(isLoggedIn,getUserReviews);
router.route('/user/booking/:id').get(isLoggedIn,getBookingUserReview);
router.route('/place/:placeId').get(getPlaceReviews);

router.route('/:id/update').put(isLoggedIn,updateReview);

module.exports = router;
