import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IndexPage from './pages/IndexPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import PlacesPage from './pages/PlacesPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import BookingsPage from './pages/BookingsPage';
import { getItemFromLocalStorage } from './utils';
import BookedPlacesPage from './pages/BookedPlacesPage';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';

const token = getItemFromLocalStorage('token');

// axios.defaults.baseURL = 'https://airbnb-clone-production.up.railway.app';
axios.defaults.baseURL = 'https://airbnb-api-5s7s.onrender.com';
// axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

function App() {
  return (
    <UserProvider>
      <PlaceProvider>
        {/* <UserContextProvider> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage />} />
            <Route path="/account/places" element={<PlacesPage />} />
            <Route path="/account/places/new" element={<PlacesFormPage />} />
            <Route path="/account/places/:id" element={<PlacesFormPage />} />
            <Route path="/place/:id" element={<PlacePage />} />
            <Route path="/account/bookings" element={<BookingsPage />} />
            <Route
              path="/account/bookings/:id"
              element={<BookedPlacesPage />}
            />
          </Route>
        </Routes>
        <ToastContainer autoClose={2000} transition={Slide} />
        {/* </UserContextProvider> */}
      </PlaceProvider>
    </UserProvider>
  );
}

export default App;
