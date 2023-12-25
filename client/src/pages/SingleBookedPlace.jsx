import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import AccountNav from '../components/ui/AccountNav';
import AddressLink from '../components/ui/AddressLink';
import BookingDates from '../components/ui/BookingDates';
import PlaceGallery from '../components/ui/PlaceGallery';
import Spinner from '../components/ui/Spinner';
import axiosInstance from '../utils/axios';

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getBookings();
  }, [id]);

  const updateLocalState = (updatedBooking) => {
    setBooking(updatedBooking);
  };


  const handleCancel = async () => {
    try {
      const response = await axiosInstance.patch(`/bookings/cancel/${id}`);
      console.log(response);
      console.log(response.data.message);
      if (response.status === 200) {
        toast(response.data.message);
      }
      else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error cancelling booking: ', error);
    }
  };

  const handleComplete = async () => {
    try {
      const response = await axiosInstance.patch(`/bookings/complete/${id}`);
      console.log(response);
      console.log(response.data.message);
      if (response.status === 200) {
        toast(response.data.message);
      }
      else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error cancelling booking: ', error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axiosInstance.patch(`/bookings/confirm/${id}`)
      console.log(response);
      console.log(response.data.message);
      if (response.status === 200) {
        toast(response.data.message);
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
                Status: {booking.status.toUpperCase()}
              </div>
              <BookingDates booking={booking} />
            </div>

            <div className='mt-3 w-full rounded-2xl p-6 text-dark sm:mt-0 sm:w-auto'>
              
            </div>                          
            <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
              <div className="hidden md:block">Total price</div>
              <div className="flex justify-center text-3xl">
                <span>₹{booking?.price}</span>
              </div>
            </div>
          </div>
          <PlaceGallery place={booking?.place} />
        </div>
      ) : (
        <h1> No data</h1>
      )}
    </div>
  );
};

export default SingleBookedPlace;
