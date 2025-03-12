import axios from 'axios';

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/"

export const axiosInstance = axios.create({
    baseURL: BASE_URL + "api",
    withCredentials: true
})