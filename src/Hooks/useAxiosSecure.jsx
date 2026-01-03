import React, { useEffect } from "react";

import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";

const instance = axios.create({
  baseURL: "https://freelance-marketplace-server-azure.vercel.app",
  // baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // Add a request interceptor
    const reqInceptors = instance.interceptors.request.use(async (config) => {
      // Do something before request is sent
      const auth = getAuth();
      const currentUser = auth.currentUser;

      // If user is logged in, attach the Firebase token
      if (currentUser) {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.status === 401 || error.status === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
      }
    );
    return () => {
      instance.interceptors.request.eject(reqInceptors);
      instance.interceptors.response.eject(reqInceptors);
    };
  }, [logOut, navigate, user]);
  return instance;
};

export default useAxiosSecure;
