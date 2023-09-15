import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';

import { UserContext } from '@/providers/UserProvider';

import AccountNav from '@/components/ui/AccountNav';
import axiosInstance from '@/utils/axios';

import PlacesPage from './PlacesPage';

const ProfilePage = () => {
  const { user, logout } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    try {
      const { data } = await axiosInstance.get('/user/logout');
      if (data.success) {
        logout();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
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
