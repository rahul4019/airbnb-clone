import apiConfig from '@/utils/config';
import React from 'react';

const PlaceImg = ({ place, index = 0, className = null }) => {
  const apiUrl = apiConfig.baseUrl; 

  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'object-cover';
  }
  return <img src={place.photos[index].startsWith('http')? place.photos[index] : (apiUrl + place.photos[index]) } alt="" className={className} />;
};

export default PlaceImg;
