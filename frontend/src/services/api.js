import axios from "axios";

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

export const registerAPI = async (body) => {
  try {
    let response = await AXIOS.post("/register", body);
    return response;
  } catch (error) {
    return error.message;
  }
};
