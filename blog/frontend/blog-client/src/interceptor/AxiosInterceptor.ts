import axios, { AxiosError } from "axios";
// import dotenv from 'dotenv'
import { getRefreshToken, getToken, storeToken } from "../service/AuthenLoginResponse";
const BASE_URL = 'http://localhost:3000/api'
// Create an Axios instance
const api = axios.create({
    baseURL: BASE_URL, // Replace with your API URL
    timeout: 5000, // Request timeout in milliseconds
});

// **Request Interceptor**
api.interceptors.request.use(
    (config) => {
        const token = getToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Attach auth token
        } 
        console.log("Before send request")
        return config;
    },
    (error) => {
        // Handle request error
       console.error(error)
        return Promise.reject(error);
    }
);

// **Response Interceptor**
api.interceptors.response.use(
    (response) => {
        console.log("Response Received:", response);
        return response;
    },
    (error: AxiosError) => {
        console.error("response error: ", error)
        if (error.response) {
            const originalRequest: any = error.config
            if (error.response.status === 401 &&
                error.request.responseURL == `${BASE_URL}/auth/refresh-token`) {
                window.location.href = '/login'
            }

            if(error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                axios.post(`${BASE_URL}/auth/refresh-token`, {
                    accessToken: getToken(),
                    refreshToken: getRefreshToken()
                }).then(response => {
                    storeToken(response.data)
                    originalRequest.headers.Authorization = `Bearer ${getToken()}`;
                    return api(originalRequest)
                }).catch(err => {
                    location.href = '/login'
                })
            }

        }
        return Promise.reject(error);
    }
);

export default api;
