import apiConfig from '@/utils/config';
import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price,
    accuracyRating,
    checkInRating,
    cleanlinessRating,
    communicationRating,
    locationRating,
    valueRating,
  } = place;
  const apiUrl = apiConfig.baseUrl;

  const avgRating = (accuracyRating + checkInRating + cleanlinessRating + communicationRating + locationRating + valueRating)/6


  return (
    <Link to={`/place/${placeId}`} className="m-4 flex flex-col md:m-2 xl:m-0">
      <div className="card ">
        {photos?.[0] && (
          <img
            src={`${photos?.[0]}`.startsWith('http') ? photos[0] : (apiUrl + photos[0])}
            className="h-4/5 w-full rounded-xl object-cover"
          />
        )}
        <div className='mt-1 flex justify-between'>
          <h2 className="truncate font-bold">{address}</h2>
          <div className='flex'>
          <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
          </svg>
          <span className='ml-1 text-md font-semibold'> {avgRating.toFixed(2)}</span>
          </div>
        </div>
        <h3 className="truncate text-sm text-gray-500">{title}</h3>
        <div className="mt-1">
          <span className="font-semibold">${price} </span>
          per night
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
