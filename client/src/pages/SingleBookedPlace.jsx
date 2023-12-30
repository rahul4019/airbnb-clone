import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import AccountNav from '../components/ui/AccountNav';
import AddressLink from '../components/ui/AddressLink';
import BookingDates from '../components/ui/BookingDates';
import PlaceGallery from '../components/ui/PlaceGallery';
import Spinner from '../components/ui/Spinner';
import axiosInstance from '../utils/axios';
import ReviewDialog from '@/components/ui/ReviewDialog';
import { Rating } from '@smastrom/react-rating'

import ReviewElement from '@/components/ui/ReviewElement';
import { capitalizeFirstLetter } from '@/utils';




const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);
  const [userReviews, setUserReviews] = useState([]);

  const [isReviewFormVisible, setReviewFormVisible] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  useEffect(() => {
    setReviewFormVisible(booking.status === 'completed');
  }, [booking.status]);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/bookings');

      // filter the data to get current booking
      const filteredBooking = data.booking.filter(
        (booking) => booking._id === id,
      );
      setBooking(filteredBooking[0]);
      
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserReviews = async () => {
    try {
      const { data } = await axiosInstance.get(`/review/user/booking/${id}`);
      // Process the response and set it in state
      setUserReviews(data);
    } catch (error) {
      console.error('Error fetching user reviews: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
    getUserReviews();

  }, [id]);

  useEffect(() => {
    if (userReviews.length > 0 ){
      setIsReviewed(true);
    }
  }, [userReviews])

  const updateLocalState = (updatedBooking) => {
    setBooking(updatedBooking);
  };


  const handleCancel = async () => {
    const bookingId = booking._id;
    try {
      const response = await axiosInstance.patch(`/bookings/cancel/${bookingId}`);
      if (response.status === 200) {
        toast(response.data.message);
        updateLocalState(response.data.booking); 
        getBookings();
      }
      else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error cancelling booking: ', error);
    }
  };

  const handleComplete = async () => {
    const bookingId = booking._id;
    try {
      const response = await axiosInstance.patch(`/bookings/complete/${bookingId}`);
      
      if (response.status === 200) {
        toast(response.data.message);
        updateLocalState(response.data.booking);
        getBookings();
      }
      else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error cancelling booking: ', error);
    }
  };

  const handleConfirm = async () => {
    const bookingId = booking._id;
    try {
      const response = await axiosInstance.patch(`/bookings/confirm/${bookingId}`)
      
      if (response.status === 200) {
        toast(response.data.message);
        updateLocalState(response.data.booking); // Update local state
        getBookings();
      }
      else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error cancelling booking: ', error);
    }
  }



  if (loading) {
    return <Spinner />;
  }


  return (
    <div>
      <AccountNav />
      {booking?.place ? (
        <div className="p-4">
          <h1 className="text-3xl">{booking?.place?.title}</h1>

          <AddressLink
            className="my-2 block"
            placeAddress={booking.place?.address}
          />
          <div className="my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row">
            <div className=" ">
              <h2 className="mb-4 text-2xl md:text-2xl">
                Your booking information
              </h2>
              <div>
              <span className='font-semibold'>Status: </span> {capitalizeFirstLetter(booking.status)}
              </div>
              <BookingDates booking={booking} />
            </div>

            <div className='mt-3 w-full flex flex-col items-center justify-between space-y-3 rounded-2xl p-6 sm:mt-0 sm:w-auto'>
              {booking.status === 'pending' && (
                <button onClick={handleConfirm} className="bg-confirm text-confirm-foreground w-48 px-4 py-2 rounded-md">
                  Confirm Booking
                </button>
              )}
              {booking.status === 'pending' && (
                <button onClick={handleCancel} className="bg-cancel text-cancel-foreground w-48 px-4 py-2 rounded-md">
                  Cancel Booking
                </button>
              )}
              {booking.status === 'confirmed' && (
                <button onClick={handleComplete} className="bg-primary text-white px-4 py-2 rounded-md">
                  Mark as Completed
                </button>
              )}
            </div>                          
            <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
              <div className="hidden md:block">Total price</div>
              <div className="flex justify-center text-3xl">
                <span>${booking?.price}</span>
              </div>
            </div>
          </div>

          <PlaceGallery place={booking?.place} />
          {(isReviewed && userReviews) && userReviews.map((review) => (
            <ReviewElement
              key={review._id}
              booking = {booking}
              review={review}
            />
          ))}
          {(isReviewFormVisible && !isReviewed) && (
            <>
              <div className='mb-3 mt-4'>
                <ReviewDialog booking={booking} getUserReviews={getUserReviews}/>
              </div>
            </>
          )}
        </div>
      ) : (
        <h1> No data</h1>
      )}
    </div>
  );
};

export default SingleBookedPlace;
