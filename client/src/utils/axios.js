import axios from "axios";

const axiosInstance = axios.create({
    // development
    // baseURL: 'http://localhost:4000',
    // production
    baseURL: "https://airbnb-api.up.railway.app",
    withCredentials: true,
})

export default axiosInstance;

