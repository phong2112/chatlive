import axios from "axios";
import { apiUrl, AppRouter } from "@/constants";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const axiosBase = axios.create({
  baseURL: apiUrl, // Replace with your API base URL
});

// Request interceptor
axiosBase.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = getCookie("token") as string;

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
    if (error.response.status === 401) {
      window.location = AppRouter.Login as any;
    }
    return Promise.reject(error);
  }
);

export default axiosBase;
