import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';
import { getItemFromLocalStorage, setItemsInLocalStorage } from '../utils';
import { toast } from 'react-toastify';

import ProfilePage from './ProfilePage';
import axiosInstance from '../utils/axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { user, login } = useContext(UserContext);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post('user/login', {
        email,
        password,
      });

      login(data.user);
      setItemsInLocalStorage('token', data.token);
      axiosInstance.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${getItemFromLocalStorage('token')}`;

      toast.success('Login successfull!');
      setRedirect(true);
    } catch (err) {
      if (err.response) {
        const { message } = err.response.data;
        toast.error(message);
      } else if (err.request) {
        toast.error(err.request);
      } else {
        console.log('Error: ', err.message);
      }
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (user) {
    return <ProfilePage />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center p-4 md:p-0">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{' '}
            <Link className="text-black underline" to={'/register'}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
