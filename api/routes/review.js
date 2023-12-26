const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares/user');

const {
    createReviews,
    updateReview,
    getReviews,
    getPlaceReviews,
    getUserReviews,
    deleteReview
} = require('../controllers/reviewController');


router.route('/').get(isLoggedIn, getReviews).post(isLoggedIn, createReviews);
router.route('/:id').delete(isLoggedIn,deleteReview);
router.route('/user').get(isLoggedIn,getUserReviews);
router.route('/place/:placeId').get(isLoggedIn,getPlaceReviews);
router.route('/:id/update').put(isLoggedIn,updateReview);



module.exports = router;
