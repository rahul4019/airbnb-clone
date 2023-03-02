import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { getItemFromLocalStorage } from '../utils';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!user) {
      const token = getItemFromLocalStorage('token');
      if (token) {
        axios.get('/user/profile').then(({ data }) => {
          setUser(data);
        });
        setReady(true);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
