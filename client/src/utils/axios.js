import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: "https://airbnb-api.up.railway.app",
    withCredentials: true,
})

export default axiosInstance;

