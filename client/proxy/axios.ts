import axios from "axios";
import { apiUrl } from "@/constants";

const axiosBase = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
});

// Request interceptor
axiosBase.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = localStorage.getItem("token") as string;

    // If token is present, add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

axiosBase.interceptors.response.use(
  (response) => {
    // Modify the response data here
    return response;
  },
  (error) => {
    // Handle response errors here
    return Promise.reject(error);
  }
);

export default axiosBase;
