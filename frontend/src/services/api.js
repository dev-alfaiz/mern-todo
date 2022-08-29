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

export const loginAPI = async (body) => {
  try {
    let response = await AXIOS.post("/login", body);
    return response;
  } catch (error) {
    return error.message;
  }
};

export const todosAPI = async () => {
  try {
    const auth = localStorage.getItem("user");
    const authDetail = JSON.parse(auth);
    let USER_TOKEN = localStorage.getItem("token");
    USER_TOKEN = JSON.parse(USER_TOKEN);
    const headers = {
      Authorization: `bearer ${USER_TOKEN}`,
    };
    let response = await AXIOS.get(`/todos/${authDetail._id}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const addTodoAPI = async (body) => {
  try {
    let USER_TOKEN = localStorage.getItem("token");
    USER_TOKEN = JSON.parse(USER_TOKEN);
    const headers = {
      Authorization: `bearer ${USER_TOKEN}`,
    };
    let response = await AXIOS.post(`/add-todo`, body, {
      headers,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const deleteTodoAPI = async (id) => {
  try {
    let USER_TOKEN = localStorage.getItem("token");
    USER_TOKEN = JSON.parse(USER_TOKEN);
    const headers = {
      Authorization: `bearer ${USER_TOKEN}`,
    };
    let response = await AXIOS.delete(`/delete-todo/${id}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};

export const updateTodoAPI = async (updateableData) => {
  try {
    let USER_TOKEN = localStorage.getItem("token");
    USER_TOKEN = JSON.parse(USER_TOKEN);
    const headers = {
      Authorization: `bearer ${USER_TOKEN}`,
    };
    let response = await AXIOS.put(
      `/update-todo/${updateableData.id}`,
      updateableData.body,
      {
        headers,
      }
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

export const searchTodoAPI = async (term) => {
  try {
    const auth = localStorage.getItem("user");
    const authDetail = JSON.parse(auth);
    let USER_TOKEN = localStorage.getItem("token");
    USER_TOKEN = JSON.parse(USER_TOKEN);
    const headers = {
      Authorization: `bearer ${USER_TOKEN}`,
    };
    let response = await AXIOS.get(`/search/${authDetail._id}/${term}`, {
      headers,
    });
    return response;
  } catch (error) {
    return error.message;
  }
};
