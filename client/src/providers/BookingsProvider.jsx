import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const BookingsContext = createContext([]);

export const BookingsProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/bookings');
      console.log('booking context: ', data);
      setBookings(data.bookings);
      setBookings(data.bookings);
    } catch (error) {
      console.log('Booking context error : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <BookingsContext.Provider value={{ bookings, setBookings, loading }}>
      {children}
    </BookingsContext.Provider>
  );
};
