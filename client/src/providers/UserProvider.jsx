import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { getItemFromLocalStorage } from '../utils';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      const token = getItemFromLocalStorage('token');
      if (token) {
        axios.get('/user/profile').then(({ data }) => {
          setUser(data);
          setLoading(false);
        });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
