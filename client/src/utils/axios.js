import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'https://airbnb-api-5s7s.onrender.com',
    // baseURL: 'http://localhost:4000',
    baseURL: proccess.env.BASE_URL,
    withCredentials: true,
})

export default axiosInstance;

