import axios from "axios";

export const environment = process.env.NODE_ENV;

export const isDevelopment = environment === "development";

const baseURL = isDevelopment
  ? "http://localhost:8080/"
  : (import.meta.env.API_LOCATION as string | undefined) ?? "";

export const axiosInstance = axios.create({
  baseURL,
});