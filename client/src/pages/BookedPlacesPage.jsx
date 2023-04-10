import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import axios from 'axios';
import AddressLink from '../components/AddressLink';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';
import Spinner from '../components/Spinner';
import PlaceCard from '../components/PlaceCard';

const BookedPlacesPage = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (id) {
      const getBookings = async () => {
        const { data } = await axios.get('/bookings');
        if(data.error){
          toast.error(data.error.message)
        }
        setBookings(data);
        setLoading(false);
      };
      getBookings();
    }
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <PlaceCard place={booking.place} key={booking._id} />
        ))
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">No bookings... yet!</h1>
          <p className="font-">
            Time to dust off your bags and start planning your next adventure
          </p>
          <div className="">
            <button className="font-semibold border border-black px-4 py-2 rounded-lg bg-transparent hover:bg-slate-100 hover:transition-all">
              Start planning
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <div className="my-8">
  //     <h1 className="text-3xl">{booking.place.title}</h1>

  //     <AddressLink
  //       className="my-2 block"
  //       placeAddress={booking.place.address}
  //     />
  //     <div className="flex bg-gray-200 p-6 my-6 rounded-2xl justify-between items-center">
  //       <div>
  //         <h2 className="text-2xl mb-4">Your booking information</h2>
  //         <BookingDates booking={booking} />
  //       </div>
  //       <div className="bg-primary p-6 text-white rounded-2xl">
  //         <div className="">Total price</div>
  //         <div className="text-3xl">₹{booking.price}</div>
  //       </div>
  //     </div>
  //     <PlaceGallery place={booking.place} />
  //   </div>
  // );
};

export default BookedPlacesPage;
