import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useSearchParams} from "react-router-dom";

import ProfilePage from './ProfilePage';
import { useAuth } from '../../hooks';


const ResetPasswordPage = () => {

    const [redirect, setRedirect] = useState(false);
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({ 
        email: searchParams.get('email').replace("?",""),
        hash: searchParams.get("hash"),
        newPassword: '', 
        confirmPassword: '' });
  const auth = useAuth();
  

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    

    const { email, hash, newPassword, confirmPassword } = formData;

    if (email.trim() === "" || hash.trim() === ""){
        setLoading(false);
        setRedirect(true);
        return toast.error("Invalid Link use forget Password again");
    }


    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
        setLoading(false);
        return toast.error("Password Fields Can't be empty");
    }else if (newPassword === confirmPassword){
        setLoading(false);
        return toast.error("Password Fields don't match");
    }

    const response = await auth.resetPassword(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  

  if (redirect) {
    return <Navigate to={'/login'} />;
  }

  if (auth.user) {
    return <ProfilePage />;
  }

  return (
    <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
      <div className="mb-40">
        <h1 className="mb-4 text-center text-4xl">Reset Your Password</h1>
        <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleFormData}
          />

            <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleFormData}
            />
          <button className="primary my-4">Reset Password</button>
        </form>

        
      </div>
    </div>
  );
};

export default ResetPasswordPage;
