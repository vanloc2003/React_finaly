import axios from "axios";
import { userLocalStore } from "./localService";
import { store } from "../redux/store";
import { setLoadingOff, setLoadingOn } from "../redux/slice/spinnerSlice";

export const TOKEN_CYBER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxNSIsIkhldEhhblN0cmluZyI6IjA3LzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1NzIwMzIwMDAwMCIsIm5iZiI6MTczMzg1MDAwMCwiZXhwIjoxNzU3MzUwODAwfQ.zoAjm1IZbVPigBMr3IPv0C22H2cjx0RFMJL2FkRoXeo";

export const BASE_URL = "https://movienew.cybersoft.edu.vn/api";

export const configHeaders = () => {
  return {
    TokenCyberSoft: TOKEN_CYBER,
  };
};

export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCyberSoft: TOKEN_CYBER,
    Authorization: "Bearer " + userLocalStore.get()?.accessToken,
    // Authorization:
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjIxLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDk3OTIwMDAwMCIsIm5iZiI6MTY4NzE5NDAwMCwiZXhwIjoxNzExMTI2ODAwfQ.I9iDnvUJNQaG_RBPSODU3vvlNF0JJ7lRamr221wclIQ",
    timeout: 1000,
  },
});

// Add a request interceptor
https.interceptors.request.use(
  function (config) {
    store.dispatch(setLoadingOn());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    store.dispatch(setLoadingOff());
    return response;
  },
  function (error) {
    store.dispatch(setLoadingOff());
    return Promise.reject(error);
  }
);
