import axios from "axios";
import { capitalize } from "../utils";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:1342/api" : "https://api.finanz.ivangonzalez.co/api";

const API = (jwt = "") =>
  axios.create({
    baseURL,
    headers: jwt ? { Authorization: `Bearer ${jwt}` } : {}
  });

const getErrorMessage = error => {
  if (typeof error === "string") {
    return error;
  }
  if (error?.response?.data?.error?.message) {
    return error.response.data.error.message;
  }
  if (Array.isArray(error?.response?.data?.message)) {
    if (Array.isArray(error?.response?.data?.message[0]?.messages)) {
      return error?.response?.data?.message[0]?.messages[0]?.message || error?.response?.data?.message[0]?.messages[0]?.id;
    }
  }
  if (error?.response?.data?.data?.errors && Object.keys(error?.response?.data?.data?.errors).length > 0) {
    return capitalize(
      Object.keys(error.response.data.data.errors)
        .map(key => error.response.data.data.errors[key][0])
        .join(", ")
    );
  }
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  return error.message;
};

const isValidUrl = (url = "") => url.startsWith("http");

const getFileUrl = (url = "") => {
  if (!url) {
    return undefined;
  }
  if (isValidUrl(url)) {
    return url;
  } else {
    return `${baseURL}${url}`;
  }
};

export default API;

export { getErrorMessage, getFileUrl };
