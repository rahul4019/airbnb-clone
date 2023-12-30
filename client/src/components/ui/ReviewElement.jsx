import React from 'react';
import { Rating } from '@smastrom/react-rating';
import ReviewDialog from './ReviewDialog';
import { capitalizeFirstLetter } from '@/utils';


const RatingWithTooltip = ({ label, value, readonly }) => (
  <div className="flex">
    <p className="text-md font-semibold">{capitalizeFirstLetter(label)}: </p>
    <Rating style={{ maxWidth: 160 }} value={value} readOnly={readonly} />
  </div>
);

const ReviewElement = ({ booking, review }) => {
  const [updatedReview, setUpdatedReview] = React.useState(review);
    // console.log(review);
    // console.log(cleanliness);
    // console.log(accuracy);
  const handleReviewUpdate = (updatedReview) => {
    setUpdatedReview(updatedReview);
  };
  
    return (
      <div className="mt-4 mb-3">
        <h2 className='mb-2 text-2xl font-semibold'>Your Review</h2>
        <div className="ratings">
          <RatingWithTooltip label="cleanliness" value={updatedReview.cleanliness} readonly={true} />
          <RatingWithTooltip label="accuracy" value={updatedReview.accuracy} readonly={true} />
          <RatingWithTooltip label="checkIn" value={updatedReview.checkIn} readonly={true} />
          <RatingWithTooltip label="communication" value={updatedReview.communication} readonly={true} />
          <RatingWithTooltip label="location" value={updatedReview.location} readonly={true} />
          <RatingWithTooltip label="value" value={updatedReview.value} readonly={true} />
        </div>
        <div className="text-xl font-bold">
          <p>Comment: <span className='font-semibold text-gray-500'>{updatedReview.comment}</span></p>
        </div>
        <div className="text-md font-semibold mb-2 text-gray-700">
          <p>{new Date(updatedReview.createdAt).toLocaleDateString()}</p>
        </div>
        <ReviewDialog booking={booking} existingReview={review} handleReviewUpdate={handleReviewUpdate} />
      </div>
    );
  };


export default ReviewElement;
