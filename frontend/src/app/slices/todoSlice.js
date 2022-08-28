import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todosAPI, addTodoAPI } from "../../services/api";

const initialState = {
  isFetching: false,
  todos: [],
  newAddedTodo: {},
  message: "",
};

export const getAllTodos = createAsyncThunk(
  "todo/getAllTodos",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await todosAPI();
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data.result);
      } else {
        return rejectWithValue(response);
      }
      //   return response.data.result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (body, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await addTodoAPI(body);
      if (response.status === 200 || response.status === 201) {
        return fulfillWithValue(response.data);
      } else {
        return rejectWithValue(response);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllTodos.pending]: (state) => {
      state.isFetching = true;
    },
    [getAllTodos.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, todos: payload };
    },
    [getAllTodos.rejected]: (state, { payload }) => {
      return { ...state, isFetching: false, todos: payload, message: payload };
    },

    [addTodo.pending]: (state) => {
      state.isFetching = true;
    },
    [addTodo.fulfilled]: (state, { payload }) => {
      return { ...state, isFetching: false, newAddedTodo: payload };
    },
    [addTodo.rejected]: (state, { payload }) => {
      return {
        ...state,
        isFetching: false,
        newAddedTodo: payload,
        message: payload,
      };
    },
  },
});

export default todoSlice.reducer;
