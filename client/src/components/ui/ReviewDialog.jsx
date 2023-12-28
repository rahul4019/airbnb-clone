import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { useAuth } from '../../../hooks';

const ReviewDialog = () => {
  
  const [loading, setLoading] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    cleanliness: 1,
    accuracy: 1,
    checkIn: 1,
    communication: 1,
    location: 1,
    value: 1,
    comment: '',
  });


  const handleReviewFormChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prevForm) => ({ ...prevForm, [name]: value }));
  };


  const handleReviewSubmit = async (e) => {
    // e.preventDefault();
    setLoading(true);

    if (reviewForm.comment.trim() === '') {
        setLoading(false);
        return toast.error("comment Can't be empty");
    }

    try {
      const response = await axiosInstance.post(`/review`, {
        ...reviewForm,
        booking: booking._id,
        place: booking.place._id,
      });

      if (response.status === 201) {
        return toast.success(response.data.message);
        // You may want to update the state or perform other actions after successful submission
      } else {
        return toast.error(response.data.error);
      }
    } catch (error) {
        setLoading(false);
        console.error('Error submitting review: ', error);
        return toast.error('Error submitting review');
    }
  };

  const StarRating = ({ value, onChange }) => {
    const stars = [1, 2, 3, 4, 5];
  
    return (
      <div>
        {stars.map((star) => (
          <label key={star}>
            {value}
            <input
              type="radio"
              name="rating"
              value={star}
              checked={value === star}
              onChange={onChange}
            />
            {star}
          </label>
        ))}
      </div>
    );
  };
  

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-600 ">
          
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        

        {/* Update form */}
        <form onSubmit={handleReviewSubmit} className="my-6">
            <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
            <label>
                Comment
            <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewFormChange}
            />
            </label>

            <StarRating
            value={reviewForm.cleanliness}
            onChange={(e) => handleReviewFormChange({ target: { name: 'cleanliness', value: e.target.value } })}
            />
            <StarRating
            value={reviewForm.accuracy}
            onChange={(e) => handleReviewFormChange({ target: { name: 'accuracy', value: e.target.value } })}
            />
            <StarRating
            value={reviewForm.checkIn}
            onChange={(e) => handleReviewFormChange({ target: { name: 'checkIn', value: e.target.value } })}
            />
            <StarRating
            value={reviewForm.communication}
            onChange={(e) => handleReviewFormChange({ target: { name: 'communication', value: e.target.value } })}
            />
            <StarRating
            value={reviewForm.location}
            onChange={(e) => handleReviewFormChange({ target: { name: 'location', value: e.target.value } })}
            />
            <StarRating
            value={reviewForm.value}
            onChange={(e) => handleReviewFormChange({ target: { name: 'value', value: e.target.value } })}
            />
            <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md"
            >
            Submit Review
            </button>
        </form>
        
        <DialogFooter>
          <Button
            disabled={loading}
            type="submit"
            className="w-full"
            onClick={handleReviewFormChange}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Post Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
