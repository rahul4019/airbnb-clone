import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';

import { UserContext } from '../providers/UserProvider';
import axiosInstance from '../utils/axios';

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [noOfGuests, setNoOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInDays(new Date(checkOut), new Date(checkIn));
  }

  const handleBooking = async () => {
    const allFieldsFilled = name.trim() !== '';

    if (!allFieldsFilled) return toast.error('Please fill all the fields');
    try {
      const response = await axiosInstance.post('/bookings', {
        checkIn,
        checkOut,
        noOfGuests,
        name,
        phone,
        place: place._id,
        price: numberOfNights * place.price,
      });

      const bookingId = response.data.booking._id;

      setRedirect(`/account/bookings/${bookingId}`);
      toast('Congratulations! Enjoy your trip.');
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
        Price: ₹{place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex justify-center">
          <div className="py-3 px-4">
            <label>Check In: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-20 sm:w-auto"
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-20 sm:w-auto"
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Phone number: </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}
      </div>
      <button onClick={handleBooking} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
