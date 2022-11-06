import axios from "axios";
import { spinnerService } from "./spiner.service";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-type": "application/json",
    },
});

export const instanceNoSpiner = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    spinnerService.requestStarted();
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
); 

instance.interceptors.response.use(
  function (response) {
    spinnerService.requestEnded();
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;