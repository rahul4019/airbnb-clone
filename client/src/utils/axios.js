import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: "https://airbnb-backend.uk.to",
    withCredentials: true,
})

export default axiosInstance;

