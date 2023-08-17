import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: proccess.env.BASE_URL,
    withCredentials: true,
})

export default axiosInstance;

