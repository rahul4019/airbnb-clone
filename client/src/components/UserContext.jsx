import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { getItemInLocalStorage, setItemsInLocalStorage } from '../utils';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {    
    if (!user) {
      const token = getItemInLocalStorage('token');
      console.log('token in frontend ', token);
      if (token) {
        axios
          .get('/user/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => {
            console.log(data);
            setUser(data);
            setReady(true);
          });
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};
