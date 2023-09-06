import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price } = place;
  return (
    <Link to={`/place/${placeId}`} className="flex flex-col">
      <div className="card ">
        {photos?.[0] && (
          <img
            src={`${photos?.[0]}`}
            className="object-cover w-full h-4/5 rounded-xl"
          />
        )}
        <h2 className="font-bold truncate">{address}</h2>
        <h3 className="text-sm text-gray-500 truncate">{title}</h3>
        <div className="mt-1">
          <span className="font-semibold">₹{price} </span>
          per night
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
