import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "x-api-key": process.env.REACT_APP_FREE_API_KEY, // Replace with your own ReqRes API key if needed
    "Content-Type": "application/json",
  },
});

export default api;
