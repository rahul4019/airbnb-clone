import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";
import PlaceGallery from "../PlaceGallery";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  useEffect(() => {
    if (id) {
      const getBookings = async () => {
        const { data } = await axios.get("/bookings");
        const foundBooking = data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      };
      getBookings();
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink
        className="my-2 block"
        placeAddress={booking.place.address}
      />
      <div className="flex bg-gray-200 p-6 my-6 rounded-2xl justify-between items-center">
        <div>
          <h2 className="text-2xl mb-4">Your booking information</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div className="">Total price</div>
          <div className="text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
};

export default BookingPage;
