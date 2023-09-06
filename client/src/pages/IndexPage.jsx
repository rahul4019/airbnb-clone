import React, { useContext } from 'react';
import { PlaceContext } from '../providers/PlaceProvider';
import Spinner from '../components/Spinner';
import PlaceCard from '../components/PlaceCard';

const IndexPage = () => {
  const { places, loading } = useContext(PlaceContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="py-32 px-4 grid grid-cols-1 md:grid-cols-2 md:gap-0 lg:grid-cols-3 xl:grid-cols-4 justify-items-center lg:gap-2 xl:gap-10">
      {places.length > 0 ? (
        places.map((place) => <PlaceCard place={place} key={place._id} />)
      ) : (
        <div className="flex flex-col w-full p-10 md:w-1/2  absolute left-1/2 right-1/2 transform -translate-x-1/2  top-40">
          <h1 className="font-semibold text-3xl">Result not found!</h1>
          <p className="font-semibold text-lg">
            Sorry, we couldn&#39;t find the place you&#39;re looking for.
          </p>
          <button className="w-32 p-2 mt-4 rounded-full bg-primary text-white">
            <a href="/" className="flex gap-1 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-5 h-5"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go back
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
