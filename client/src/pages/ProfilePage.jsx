import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';

import AccountNav from '@/components/ui/AccountNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import PlacesPage from './PlacesPage';
import { useAuth } from '../../hooks';
import { LogOut, Mail, Phone, Text, User, MapPin } from 'lucide-react';
import EditProfileDialog from '@/components/ui/EditProfileDialog';
import { useSelectRange } from 'react-day-picker';
import ChangePasswordDialog from '@/components/ui/ChangePasswordDialog';
import Spinner from '@/components/ui/Spinner';
import apiConfig from '@/utils/config';

const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout , loading} = auth;
  const [redirect, setRedirect] = useState(null);
  const apiUrl = apiConfig.baseUrl;

  useEffect(() => {
    if (!user && !loading) {
      setRedirect('/login');
    }
  }, [user, loading]);
  
  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  // if(user){
  //   console.log(apiUrl + user.picture);

  // }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success(response.message);
      setRedirect('/');
    } else {
      toast.error(response.message);
    }
  };

  if (loading) {
    // Add a loading indicator or some placeholder content while user data is loading
    return <Spinner />;
  }

  
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="m-4 flex flex-col items-center gap-8 rounded-[10px]  p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20">
          {/* avatar */}
          <div className="flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4  sm:h-72 sm:w-72 md:h-96 md:w-96">
            <Avatar>
              {user.picture ? (
                <AvatarImage src={user.picture.startsWith('http') ? user.picture : (apiUrl+user.picture)} />
              ) : (
                <AvatarImage src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png" className="object-cover"/>
              )}

              <AvatarFallback>{user.name.slice([0], [1])}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0">
            {/* user details */}
            <div className="flex flex-col items-center gap-2 sm:items-start">
              <div className="flex items-center gap-2">
                <Text height="18" width="18" />
                <div className="text-xl">
                  <span>Name: </span>
                  <span className="text-gray-600">{user.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail height="18" width="18" />
                <div className="text-xl">
                  <span>Email: </span>
                  <span className="text-gray-600">{user.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <User height="18" width="18" />
                <div className="text-xl">
                  <span>Bio: </span>
                  <span className="text-gray-600">{user.bio ? user.bio : "Add Your Bio"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone height="18" width="18" />
                <div className="text-xl">
                  <span>phone: </span>
                  <span className="text-gray-600">{user.phone ? user.phone : "Add Your Phone"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin height="18" width="18" />
                <div className="text-xl">
                  <span>Address: </span>
                  <span className="text-gray-600">{user.address ? user.address : "Add YOur Address"}</span>
                </div>
              </div>
              <p></p>
            </div>

            {/* Action buttons */}
            <div className="flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10">
              {/* <Button varient="secondary">Edit profile</Button> */}
              <EditProfileDialog />

              <ChangePasswordDialog />

              <Button variant="secondary" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
      {subpage === 'places' && <PlacesPage />}
    </div>
  );
};

export default ProfilePage;
