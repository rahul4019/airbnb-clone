import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Loader2} from 'lucide-react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/utils/axios';
import { useAuth } from '../../../hooks';

const ReviewDialog = ({ booking }) => {
  
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    e.preventDefault();
    setLoading(true);

    if (reviewForm.comment.trim() === '') {
        setLoading(false);
        toast.error("comment Can't be empty");
    }
    if (reviewForm)

    try {
        // console.log(reviewForm);
        const response = await axiosInstance.post(`/review`, {
            ...reviewForm,
            booking: booking._id,
            place: booking.place._id,
        });

      if (response.status == 200) {
        setLoading(false);
        toast.success(response.data.message);
        setIsOpen(false);
      } else {
        setLoading(false);
        // console.log(response);
        toast.error(response.data.error);
      }
    } catch (error) {
        setLoading(false);
        console.error('Error submitting review: ', error);
        // console.log(error);
        if (error.response){
            return toast.error(error.response.data.error);
        }
        return toast.error(error);
    }
  };

 

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-rose-600 " onClick={() => setIsOpen(true)}>
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        

        {/* Update form */}
        

        <form onSubmit={handleReviewSubmit} className="my-6" style={{maxHeight: "400px", overflowY:"auto"}}>
            <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
            <label>
                Comment
            <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={handleReviewFormChange}
            />
            </label>

            <div>

                <div id="cleanliness_rating" className='text-md font-semibold'>Cleanliness:</div>
                <Rating
                isRequired
                style={{ maxWidth: 200 }}
                value={reviewForm.cleanliness}
                visibleLabelId="cleanliness"
                onChange={(selectedValue) =>
                    setReviewForm((prevData) => ({ ...prevData, cleanliness: selectedValue }))
                }
                />
            </div>

            <div>

                <div id="cleanliness_rating" className='text-md font-semibold'>Accuracy</div>
                <Rating
                isRequired
                style={{ maxWidth: 200 }}
                value={reviewForm.accuracy}
                visibleLabelId="accuracy"
                onChange={(selectedValue) =>
                    setReviewForm((prevData) => ({ ...prevData, accuracy: selectedValue }))
                }
                />
            </div>
            
            <div>

                <div id="checkIn_rating" className='text-md font-semibold'>CheckIn</div>
                <Rating
                isRequired
                style={{ maxWidth: 200 }}
                value={reviewForm.checkIn}
                visibleLabelId="checkIn"
                onChange={(selectedValue) =>
                    setReviewForm((prevData) => ({ ...prevData, checkIn: selectedValue }))
                }
                />
            </div>

            <div>

                <div id="communication_rating" className='text-md font-semibold'>communication</div>
                <Rating
                isRequired
                style={{ maxWidth: 200 }}
                value={reviewForm.communication}
                visibleLabelId="communication"
                onChange={(selectedValue) =>
                    setReviewForm((prevData) => ({ ...prevData, communication: selectedValue }))
                }
                />
            </div>
        
            <div>

                <div id="location_rating" className='text-md font-semibold'>location</div>
                <Rating
                isRequired
                style={{ maxWidth: 200 }}
                value={reviewForm.location}
                visibleLabelId="location"
                onChange={(selectedValue) =>
                    setReviewForm((prevData) => ({ ...prevData, location: selectedValue }))
                }
                />
            </div>
            <div>

                <div id="value_rating" className='text-md font-semibold'>value</div>
                <Rating
                isRequired
                style={{ maxWidth: 200 }}
                value={reviewForm.value}
                visibleLabelId="value"
                onChange={(selectedValue) =>
                    setReviewForm((prevData) => ({ ...prevData, value: selectedValue }))
                }
                />
            </div>
            
            <Button
                disabled={loading}
                type="submit"
                className="w-full"
                onClick={handleReviewSubmit}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post Review
            </Button>
        </form>
        
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
