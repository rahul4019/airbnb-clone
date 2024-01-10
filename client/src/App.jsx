import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/ui/Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import BookingsPage from './pages/BookingsPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import SingleBookedPlace from './pages/SingleBookedPlace';
import ResetPasswordPage from './pages/ResetPasswordPage';
import axiosInstance from './utils/axios';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getItemFromLocalStorage } from './utils';
import NotFoundPage from './pages/NotFoundPage';
// import ProtectedRoute from './ProtectedRoute';

function App() {
  useEffect(() => {
    // set the token on refreshing the website
    axiosInstance.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${getItemFromLocalStorage('token')}`;
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  
  const updateAuthenticationStatus = () => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  };


  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <PlaceProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage updateAuthenticationStatus={updateAuthenticationStatus} />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/reset" element={<ResetPasswordPage />} />

              <Route path="/account" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
              <Route path="/account/places" element={isAuthenticated ? <PlacesPage /> : <Navigate to="/login" />} />
              <Route path="/account/places/new" element={isAuthenticated ? <PlacesFormPage /> : <Navigate to="/login" />} />
              <Route path="/account/places/:id" element={isAuthenticated ? <PlacesFormPage /> : <Navigate to="/login" />} />
              <Route path="/account/bookings" element={isAuthenticated ? <BookingsPage /> : <Navigate to="/login" />} />
              <Route
                path="/account/bookings/:id"
                element={isAuthenticated ? <SingleBookedPlace /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} transition={Slide} />
        </PlaceProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
