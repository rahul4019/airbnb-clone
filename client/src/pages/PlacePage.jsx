import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import axiosInstance from '@/utils/axios';

import Spinner from '@/components/ui/Spinner';
import AddressLink from '@/components/ui/AddressLink';
import BookingWidget from '@/components/ui/BookingWidget';
import PlaceGallery from '@/components/ui/PlaceGallery';
import PerksWidget from '@/components/ui/PerksWidget';
import { Rating } from '@smastrom/react-rating';
import ReviewCard from '@/components/ui/ReviewCard';
import apiConfig from '@/utils/config';

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [placeReview, setPlaceReview] = useState(null);
  const apiUrl = apiConfig.baseUrl;

  const [overallR, setOverallR] = useState(null);


  const calculateOverallRating = (placeData) => {
    
    const {
      cleanlinessRating,
      accuracyRating,
      checkInRating,
      communicationRating,
      locationRating,
      valueRating,
    } = placeData;

    
    const averageRating =
      (cleanlinessRating + accuracyRating + checkInRating + communicationRating + locationRating + valueRating) / 6;

    // console.log(averageRating);
    setOverallR(averageRating);
  };
  

  useEffect(() => {
    if (!id) {
      return '';
    }

    setLoading(true);

    const getPlace = async () => {
      const { data } = await axiosInstance.get(`/places/${id}`);
      setPlace(data.place);
      if(data){
        calculateOverallRating(data.place);
      }
      setLoading(false);
    };

    const getPlaceReview = async () => {
      const { data } = await axiosInstance.get(`/review/place/${id}`);
      setPlaceReview(data);
      console.log(data);
      setLoading(false);
    };
    getPlace();
    getPlaceReview();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!place) {
    return;
  }

  
  return (
    <div className="mt-4 overflow-x-hidden px-8 pt-20 ">
      <h1 className="text-3xl">{place.title}</h1>

      <AddressLink placeAddress={place.address} />
      <PlaceGallery place={place} />
      <div className='mt-8 mb-2'>
        <div className='text-start'>
      {(overallR !== null && overallR > 0) ? (
            <>
              <h2 className='mt-1 text-2xl font-semibold'>Overall Rating</h2>
              <div className='flex'>
                  <Rating style={{ maxWidth: 160 }} value={overallR.toFixed(2)} readOnly />
                  <h2 className='text-2xl font-bold'>{overallR.toFixed(2)}</h2>
              </div>
            </>
      )
      :
      (
        <>
        <h2 className='mt-1 text-2xl font-semibold'>This place hasn't been rated yet</h2>
        </>
      )}
        </div>
      </div>
      <div className="mt-8 mb-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
        <div className="">
          <div className="my-4 ">
            <h2 className="text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          Max number of guests: {place.maxGuests}
          <PerksWidget perks={place?.perks} />
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="-mx-8 border-t bg-white px-8 py-8">
        <div>
          <h2 className="mt-4 text-2xl font-semibold">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm leading-5 text-gray-700">
          {place.extraInfo}
        </div>
      </div>

      <div className="-mx-8 border-t bg-white px-8 py-8">
        <div className="my-4 flex">
          <div className='align-items-center'>
            <img
              className="w-24 h-24 rounded-full"
              src={place.owner.picture.startsWith('http')? place.owner.picture : (apiUrl + place.owner.picture) }
              alt={`${place.owner.name}'s avatar`}
              />
          </div>
          <div className='ml-4'>
            <h2 className="text-2xl font-semibold">Hosted by {place.owner.name}</h2>
            <p className='mt-2 text-md text-gray-400'>Joined in {place.owner.createdAt ? new Date(place.owner.createdAt).toLocaleDateString() : "NA"}</p>
          </div>
        </div>
      </div>

      
      <div className='mt-3 mb-4'>
        <div className='mt-1'>
              <h3 className='text-2xl font-semibold'>User Reviews</h3>
        </div>
        {(placeReview && placeReview.length > 0) ? 
          placeReview.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
          :
          (
            <>
              <p className='mt-1 text-sm'>No One has reviewed this package yet.</p>
            </>
          )

        }
      </div>


    </div>
  );
};

export default PlacePage;
