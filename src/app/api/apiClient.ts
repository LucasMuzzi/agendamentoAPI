import axios from "axios";

export const apiAgend = axios.create({
  baseURL: "http://localhost:3169/",
});
