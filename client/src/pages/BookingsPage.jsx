import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import { Link } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
import Spinner from '../components/Spinner';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/bookings');
      console.log("User's booking: ", data);
      setBookings(data.booking);
    } catch (error) {
      console.log('Error: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center">
      <AccountNav />
      <div>
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="mx-4 lg:mx-0 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden my-8 h-28 md:h-40"
              key={booking._id}
            >
              <div className="w-2/6 md:w-1/6">
                <PlaceImg
                  place={booking.place}
                  className={'w-full h-full object-cover'}
                />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="md:text-2xl">{booking.place.title}</h2>
                <div className="md:text-xl">
                  <div className="flex gap-2 border-t "></div>
                  <div className="md:text-xl">
                    <BookingDates
                      booking={booking}
                      className="hidden md:flex items-center mb-2 mt-4  text-gray-600"
                    />

                    <div className="flex gap-1 items-center my-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span className="text-xl md:text-2xl">
                        Total price: ₹{booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
