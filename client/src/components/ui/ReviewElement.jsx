import React from 'react';
import { Rating } from '@smastrom/react-rating';
import ReviewDialog from './ReviewDialog';
import { toast } from 'react-toastify';

import { Loader2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/utils';
import axiosInstance from '@/utils/axios';

const RatingWithTooltip = ({ label, value, readonly }) => (
  <div className="flex">
    <p className="text-md font-semibold">{capitalizeFirstLetter(label)}: </p>
    <Rating style={{ maxWidth: 160 }} value={value} readOnly={readonly} />
  </div>
);

const ReviewElement = ({ booking, review, getUserReviews, setIsReviewed }) => {
  const [updatedReview, setUpdatedReview] = React.useState(review);
  const [loading, setLoading] = React.useState(false);
  const handleReviewUpdate = (updatedReview) => {
    setUpdatedReview(updatedReview);
  };

  const handleReviewDelete = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axiosInstance.delete(`/review/${review._id}`);
      if (response.status == 200) {
        setLoading(false);
        toast.success(response.data.message);
        getUserReviews();
        setIsReviewed(false);
      }
      else {
        setLoading(false);
        toast.error(response.data.error);
      }
    } catch (error){
      console.error(error);
      setLoading(false);
      toast.error(response.data.error);
    }

  }
  
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
        
        <Button onClick={handleReviewDelete} disabled={loading} className="ml-2 bg-red-800 mt-4">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete Review
        </Button>
      </div>
    );
  };


export default ReviewElement;
