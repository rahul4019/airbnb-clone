import React from 'react';
import { Rating } from '@smastrom/react-rating';
import ReviewDialog from './ReviewDialog';


const RatingWithTooltip = ({ label, value, readonly }) => (
  <div className="rating-with-tooltip">
    <p>{label}: </p>
    <div>
      <Rating style={{ maxWidth: 160 }} value={value} readOnly={readonly} />
    </div>
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
      <div className="review-container">
        <div className="ratings">
          <RatingWithTooltip label="cleanliness" value={updatedReview.cleanliness} readonly={true} />
          <RatingWithTooltip label="accuracy" value={updatedReview.accuracy} readonly={true} />
          <RatingWithTooltip label="checkIn" value={updatedReview.checkIn} readonly={true} />
          <RatingWithTooltip label="communication" value={updatedReview.communication} readonly={true} />
          <RatingWithTooltip label="location" value={updatedReview.location} readonly={true} />
          <RatingWithTooltip label="value" value={updatedReview.value} readonly={true} />
        </div>
        <div className="comment">
          <p>Comment: {updatedReview.comment}</p>
        </div>
        <div className="createdAt">
          <p>Created At: {updatedReview.createdAt}</p>
        </div>
        <ReviewDialog booking={booking} existingReview={review} handleReviewUpdate={handleReviewUpdate} />
      </div>
    );
  };


export default ReviewElement;
