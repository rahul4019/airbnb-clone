import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { getItemFromLocalStorage } from '../utils';
import Spinner from '../components/Spinner';
import PlaceCard from '../components/PlaceCard';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getItemFromLocalStorage('token');
    const getPlaces = async () => {
      try {
        const { data } = await axios.get('places/user-places', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <AccountNav />
      <div className="text-center ">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={'/account/places/new'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4 ">
        {places.length > 0 &&
          places.map((place) => <PlaceCard place={place} key={place._id} />)}
      </div>
    </div>
  );
};

export default PlacesPage;
