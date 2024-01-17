import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { UserContext } from '@/providers/UserProvider';
import { PlaceContext } from '@/providers/PlaceProvider';

import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';
import axiosInstance from '@/utils/axios';

// USER
export const useAuth = () => {
    return useContext(UserContext)
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = getItemFromLocalStorage('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, [])

    const register = async (formData) => {
        const { name, email, password } = formData;

        try {
            const { data } = await axiosInstance.post('user/register', {
                name,
                email,
                password,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Registration successfull' }
        } catch (error) {
            const { message } = error.response.data
            return { success: false, message }
        }
    }

    const login = async (formData) => {
        const { email, password } = formData;

        try {
            const { data } = await axiosInstance.post('user/login', {
                email,
                password,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            const { message } = error.response.data
            return { success: false, message }
        }
    }

    const googleLogin = async (credential) => {
        const decoded = jwt_decode(credential);
        try {
            const { data } = await axiosInstance.post('user/google/login', {
                name: `${decoded.given_name} ${decoded.family_name}`,
                email: decoded.email,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const logout = async () => {
        try {
            const { data } = await axiosInstance.get('/user/logout');
            if (data.success) {
                setUser(null);

                // Clear user data and token from localStorage when logging out
                removeItemFromLocalStorage('user');
                removeItemFromLocalStorage('token');
            }
            return { success: true, message: 'Logout successfull' }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Something went wrong!' }
        }
    }

    const uploadPicture = async (picture) => {
        try {
            const formData = new FormData()
            formData.append('picture', picture);
            const { data } = await axiosInstance.post('/user/upload-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (userDetails) => {
        const { name, bio, phone, address, picture } = userDetails;
        const email = JSON.parse(getItemFromLocalStorage('user')).email
        try {
            const { data } = await axiosInstance.patch('/user/update-user', {
                name, bio, email, phone, address, picture
            })
            if (data.user){
                setUser(data.user);
                setItemsInLocalStorage('user', data.user);
            }
            return data;
        } catch (error) {
            console.log(error)
            return { success: false, error: error }
        }
    }

    const updatePassword = async (passwordDetails) => {
        const { oldPassword, newPassword, confirmNewPassword} = passwordDetails;
        const email = JSON.parse(getItemFromLocalStorage('user')).email
        try {
            const { data } = await axiosInstance.post('/user/update-password', {
                oldPassword, newPassword, email
            })
            console.log(data);
            return { success: true, message: data.message };
        } catch (error) {
            console.error(error);
            const  message = error.response.data
            if (message){
                return { success: false, error: message.error }
            }
            else{
                return { success: false, error: "Internal Server Error" }
            }
        }
    }

    const forgotPassword = async (emailDetails) => {
        const { email} = emailDetails;
        try {
            const { data } = await axiosInstance.post('/user/forgot-password', {
                email
            })
            console.log(data);
            return { success: true, message: data.message };
        } catch (error) {
            console.error(error);
            const  message = error.response.data
            if (message){
                return { success: false, error: message.error }
            }
            else{
                return { success: false, error: "Internal Server Error" }
            }
        }
    }




    return {
        user,
        setUser,
        register,
        login,
        googleLogin,
        logout,
        loading,
        uploadPicture,
        updateUser,
        updatePassword,
        forgotPassword
    }
}


// PLACES
export const usePlaces = () => {
    return useContext(PlaceContext)
}

export const useProvidePlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPlaces = async () => {
        const { data } = await axiosInstance.get('/places');
        setPlaces(data.places);
        setLoading(false);
    };

    useEffect(() => {
        getPlaces();
    }, [])

    return {
        places,
        setPlaces,
        loading,
        setLoading
    }
}