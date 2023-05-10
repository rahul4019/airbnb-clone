import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import PlacesPage from './PlacesPage';
import AccountNav from '../components/AccountNav';
import Spinner from '../components/Spinner';
import { removeItemFromLocalStorage } from '../utils';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { loading, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const logout = async () => {
    setUser(null);
    removeItemFromLocalStorage('token');
    toast.success('Logged out');
    setRedirect('/');
  };

  if (loading) {
    return <Spinner />;
  }

  if (!loading && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})
          <br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
