import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { add, addDays, differenceInDays } from 'date-fns';
import { toast } from 'react-toastify';

import { UserContext } from '@/providers/UserProvider';
import axiosInstance from '@/utils/axios';
import DatePickerWithRange from './DatePickerWithRange';

const BookingWidget = ({ place }) => {
  // const [checkIn, setCheckIn] = useState('');
  // const [checkOut, setCheckOut] = useState('');
  const [dateRange, setDateRange] = useState({ from: null, to: null });
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

  const numberOfNights =
    dateRange.from && dateRange.to
      ? differenceInDays(
          new Date(dateRange.to).setHours(0, 0, 0, 0),
          new Date(dateRange.from).setHours(0, 0, 0, 0)
        )
      : 0;

  const handleBooking = async () => {
    // check for date range selction
    if (numberOfNights < 1) {
      return window.alert('Please select valid dates');
    }
    const allFieldsFilled = name.trim() !== '';

    if (!allFieldsFilled) return toast.error('Please fill all the fields');
    try {
      const response = await axiosInstance.post('/bookings', {
        checkIn: dateRange.from,
        checkOut: dateRange.to,
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
    <div className="bg-white shadow-xl p-4 rounded-2xl">
      <div className="text-xl text-center">
        Price: <span className="font-semibold">₹{place.price}</span> / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex w-full ">
          <DatePickerWithRange setDateRange={setDateRange} />
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests: </label>
          <input
            type="number"
            value={noOfGuests}
            onChange={(e) => setNoOfGuests(e.target.value)}
          />
        </div>
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
      </div>
      <button onClick={handleBooking} className="primary mt-4">
        Book this place
        {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
      </button>
    </div>
  );
};

export default BookingWidget;
