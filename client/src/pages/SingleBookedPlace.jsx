import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AccountNav from '../components/AccountNav';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';
import Spinner from '../components/Spinner';

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/bookings');

      // filter the data to get current booking
      const filteredBooking = data.booking.filter(
        (booking) => booking._id === id
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
          <div className="flex bg-gray-200 p-6 my-6 rounded-2xl justify-between items-center">
            <div>
              <h2 className="text-2xl mb-4">Your booking information</h2>
              <BookingDates booking={booking} />
            </div>
            <div className="bg-primary p-6 text-white rounded-2xl">
              <div className="">Total price</div>
              <div className="text-3xl">₹{booking?.price}</div>
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
