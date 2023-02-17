import React from 'react';

const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return (
    <div>
      <img
        src={`https://airbnb-clone-api.onrender.com/uploads/${place.photos[index]}`}
        alt=""
        className={className}
      />
    </div>
  );
};

export default PlaceImg;
