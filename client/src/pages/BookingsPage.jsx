import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AccountNav from '../components/AccountNav';
import PlaceImg from '../components/PlaceImg';
import BookingDates from '../components/BookingDates';
import Spinner from '../components/Spinner';
import { getItemFromLocalStorage } from '../utils';
import axiosInstance from '../utils/axios';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getItemFromLocalStorage('token');
    const getBookings = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get('/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(data.booking);
      } catch (error) {
        console.log('Error: ', error);
      } finally {
        setLoading(false);
      }
    };
    getBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col items-center">
      <AccountNav />
      <div>
        {bookings?.length > 0 ? (
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
          ))
        ) : (
          <div className="">
            <div className="flex flex-col justify-start">
              <h1 className="text-3xl my-6 font-semibold">Trips</h1>
              <hr className="border border-gray-300" />
              <h3 className="text-2xl font-semibold pt-6">
                No trips booked... yet!
              </h3>
              <p>
                Time to dust off you bags and start planning your next adventure
              </p>
              <Link to="/" className="my-4">
                <div className="flex justify-center w-40 p-3 border border-black rounded-lg font-semibold text-lg hover:bg-gray-50">
                  Start Searching
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
