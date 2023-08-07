import { createContext, useEffect, useState } from 'react';
import axiosInstance from '../utils/axios';

export const PlaceContext = createContext([]);

export const PlaceProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPlaces = async () => {
      const { data } = await axiosInstance.get('/places');
      setPlaces(data.places);
      setLoading(false);
    };
    getPlaces();
  }, []);

  return (
    <PlaceContext.Provider value={{ places, setPlaces, setLoading, loading }}>
      {children}
    </PlaceContext.Provider>
  );
};
