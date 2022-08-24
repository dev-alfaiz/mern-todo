import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerAPI, loginAPI } from "../../services/api";

const initialState = {
  isFetching: false,
  userData: null,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (body, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await registerAPI(body);
      if (response.status === 200 || response.status === 201) {
        let data = response.data.result;
        let token = response.data.auth;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(token));
        let payloadData = { ...data, token };
        return fulfillWithValue(payloadData);
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (body, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await loginAPI(body);
      if (response.status === 200 || response.status === 201) {
        let data = response.data.result;
        let token = response.data.auth;
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", JSON.stringify(token));
        let payloadData = { ...data, token };
        return fulfillWithValue(payloadData);
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    user: (state, { payload }) => {
      state.userData = payload;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, userData: payload };
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.message = payload;
    },

    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, userData: payload };
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.message = payload;
    },
  },
});

export const { user } = authSlice.actions;

export default authSlice.reducer;
