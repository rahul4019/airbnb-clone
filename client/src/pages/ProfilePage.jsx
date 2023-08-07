import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';
import Spinner from '../components/Spinner';
import { removeItemFromLocalStorage } from '../utils';

const ProfilePage = () => {
  const { user, logout } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = () => {
    logout();
    removeItemFromLocalStorage('token');
    toast.success('Logged out');
    setRedirect('/');
  };

  if (!user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})
          <br />
          <button
            className="w-3/4 md:w-full text-white bg-primary rounded-2xl p-2 mt-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
