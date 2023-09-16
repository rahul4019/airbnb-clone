import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axiosInstance from '@/utils/axios';
import { UserContext } from '@/providers/UserProvider';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserGlobally } = useContext(UserContext);

  const handleRegisterForm = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post('user/register', {
        name,
        email,
        password,
      });

      if (data.user) {
        setUserGlobally(data.user);
      }
      toast.success('Registration successful!');
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

  const googleLogin = () => {
    window.open('https://airbnb-api.up.railway.app/auth/google', '_self');
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex justify-around items-center p-4 md:p-0">
      <div className="mb-40">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={handleRegisterForm}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary my-4">Register</button>
        </form>
        <div className="flex w-full items-center gap-4">
          <div className="border-[1px] h-0 w-1/2"></div>
          <p className="small -mt-1">or</p>
          <div className="border-[1px] h-0 w-1/2"></div>
        </div>

        {/* Google login button */}
        <button
          className="social my-4 flex justify-center gap-4"
          onClick={googleLogin}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fbc02d"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#e53935"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4caf50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1565c0"
              d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          Continue with Google
        </button>

        <div className="text-center py-2 text-gray-500">
          Already a member?
          <Link className="text-black underline" to={'/login'}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
